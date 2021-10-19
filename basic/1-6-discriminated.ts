{
  // function: login -> success, fail ⏱
  // union안에 동일한 키를 가지고 있도록해준다. result
  type SuccessState = {
    result: 'success';
    response: {
      body: string;
    };
  };
  type FailState = {
    result: 'fail';
    reason: string;
  };

  // 공통적 property인 result를 만듦으로서 더 간편하게 코딩가능
  type LoginState = SuccessState | FailState;

  function login(): LoginState {
    return {
      result: 'success',
      response: {
        body: 'logged in!',
      },
    };
  }

  // printLoginState(state: LoginState)
  // success -> 🎉 body
  // fail -> 😭 reason
  // state가 LoginState라 SuccessState 일수도 FailState일수도 있지만,
  // result라는 것을 공통적으로 가지고 있어서 접근 가능함
  function printLoginState(state: LoginState) {
    if (state.result === 'success') {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
}
