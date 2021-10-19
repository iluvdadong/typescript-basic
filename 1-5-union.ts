{
  /**
   *  Union Types: OR
   *  타입스크립트에서 코딩할 때 아주 많이쓴다.
   * 
   */
  type Direction = 'left' | 'right' | 'up' | 'down';
  function move(direction: Direction) {
    console.log(direction);
  }
  move('down');

  // 다른 숫자는 할당할 수 없고, 정의된 아래 3가지 중 1개만 할당 가능
  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  // 실전 예제
  // function: login -> success, fail ⏱
  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };
  type LoginState = SuccessState | FailState;

  function login(): LoginState {
    return {
      response: {
        body: 'logged in!',
      },
    };
  }

// my answer
// printLoginState(state: LoginState) {
//   if(state === SuccessState) {
//     console.log(state.response.body);
//   } else {
//     console.log(state.reason);
//   }
// }


  // printLoginState(state: LoginState)
  // success -> 🎉 body
  // fail -> 😭 reason
  // 파라미터로 받아오는 것은 state이고 LoginState 타입이다.
  function printLoginState(state: LoginState) {
    // response라는 키가 state안에 있다면 접근 가능
    // 하지만 아래 방법보다 더 좋은 방법이 있음. discriminated union 사용
    if ('response' in state) {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
}
