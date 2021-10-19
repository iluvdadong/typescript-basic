/**
 * Type Inference
 */

// 선언함과 동시에 문자열을 할당했기 때문에 
// 타입이 string으로 자동으로 선언된 것임

let text = 'hello';

// print(message: string)도 가능하지만,
// 디폴트값을 아래처럼 할당하면 message는 string 타입이라는 것을 알아서
// any가 아니게 된다.
function print(message = 'hello') {
  console.log(message);
}
print('hello');

// return 되는 값이 number라는 것도 타입추론됨
// 하지만 작성하는 습관을 드리는게 중요하다.
function add(x: number, y: number): number {
  return x + y;
}
const result = add(1, 2);
// result가 자동으로 number로 자동으로 추론해줌
