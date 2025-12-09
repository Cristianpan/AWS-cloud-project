import { ISessionRepository } from "./Interfaces";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { dynamodb } from "../config/aws/dynamodb";
import { PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Session } from "../models/Session";

export const SessionRepository = (): ISessionRepository => {
    const TABLE_NAME = "session";
    return {
        createSession: async (userId: number) => {
            const session = {
                id: uuid(),
                fecha: Math.floor(Date.now() / 1000),
                alumnoId: userId,
                active: true,
                sessionString: crypto.randomBytes(64).toString("hex"),
            };

            await dynamodb.send(
                new PutCommand({
                    TableName: TABLE_NAME,
                    Item: session,
                })
            );

            return session;
        },

        getSession: async (sessionString: string) => {
            const result = await dynamodb.send(
                new QueryCommand({
                    TableName: TABLE_NAME,
                    IndexName: "sessionString-index",
                    KeyConditionExpression: "sessionString = :token",
                    ExpressionAttributeValues: {
                        ":token": sessionString,
                    },
                })
            );

            return result.Items?.[0] as Session;
        },

        invalidSession: async (id: string) => {
            await dynamodb.send(
                new UpdateCommand({
                    TableName: TABLE_NAME,
                    Key: {
                        id
                    },
                    UpdateExpression: "SET active = :active",
                    ExpressionAttributeValues: {
                        ":active": false,
                    },
                })
            );
        },
    };
};
