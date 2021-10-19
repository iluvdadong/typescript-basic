{
  /**
   * Type Assertions 💩
   */

  // 자바스크립트는 타입이 없어서 타입스트립트가 전혀 알 수 없어서 any를 쓴다.
  function jsStrFunc(): any {
    return "디기둥가~"
    return 2;
  }
  // 근데 any타입이기 때문에 문자열 관련 length변수를 사용할 수가 없다 ㅠ
  // 그래서 casting을 아래처럼 할 수가 있다. 
  const result = jsStrFunc();
  console.log((result as string).length);
  // 그대신 만약 2를 리턴했는데 length를 한다? 그럼 undefined로 나온다.
  // 어플리케이션이 죽지 않지만,, undefined으로 나옴

  console.log((<string>result).length);

  const wrong: any = 5;

  // 배열로 장담했기 때뭉에 push를 했지만,,,, wrong은 5라구요! number,,그럼
  // push는 사용할 수 없기 때문에 어플리케이션이 죽어버림
  console.log((wrong as Array<number>).push(1)); // 😱


  // 숫자를 찾으면 number 어레이를 리턴하고 못찾으면 undefined 리턴
  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers()!;

  // numbers는 숫자배열일 수 있지만 undefined일수도 있어서,,
  // push를 쓸수가 없음!
  numbers.push(2); // 😱

  // 근데 ! 느낌표를 붙이면 무조건 undefined아니야~! 라는 말 장담해버림
  // optional ? 랑 다름
  numbers!.push(2); // 😱

  // querySelector 요소가 있으면 리턴하고, 없으면 null로 리턴
  const button = document.querySelector('class')!;
  // 아래처럼 사용할 수 있지만, 정말 장담할 수 있지만
  if(button) {
    button.nodeValue; 
  }
  // 정말 장담할 수 있으면 아래처럼 느낌표로 쓸 수 있다.하지만 비추
  // const button = document.querySelector('class')!;

}
