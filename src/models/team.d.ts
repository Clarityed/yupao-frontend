/**
 * 队伍类别
 */
import {UserType} from "./user";

export type TeamType = {
    id: number;
    name: string;
    description: string;
    maxNum: number;
    expireTime?: Date;
    password?: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser: UserType;
};