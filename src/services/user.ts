import myAxios from "../plugins/MyAxios";
import {getCurrentUserState, setCurrentUserState} from "../states/user";

export const getCurrentUser = async () => {
/*    const currentUser = await getCurrentUserState();
    // 如果已经登录，那么就直接返回登录对象
    if (currentUser) {
        return currentUser;
    }*/
    // 如果未登录，执行下面语句
    const res = await myAxios.get('/user/current');
    // @ts-ignore
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}

