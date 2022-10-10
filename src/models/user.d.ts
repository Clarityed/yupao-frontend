/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    userProfile?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    createTime: Date;
    userCode: string;
    tags: string; // 这里本来是字符串数组的，现在进行了修改，后期数据有问题可以针对这里分析
};