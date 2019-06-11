import { $post, $get } from '../fetch/Http'

export default {
     betslip(){// 下注
        return $get('betslip.json');
    },
     currentUser(){// 当前用户
        return $get('currentUser.json');
    },
     sportsbook(){// 赛事预定
        return $get('sportsbook.json');
    },
     versions(){// 版本
        return $get('versions.json');
    }

}

