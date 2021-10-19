{
  /**
   * Type Aliases
   * 타입스크립트를 사용하는 이유! 강력한 이유!
   * 새로운 타입을 내가 정의할 수 있다는 말이다.
   */

  // 지금부터 Text라는 타입은 문자열 string을 말합니다. 라는 뜻
  type Text = string;
  const name: Text = "ellie";
  const address: Text = "korea";

  type Num = number;

  // primitive 타입 뿐만 아니라 오브젝트 형태도 가능하다.
  // 타입은 object인데, 그안에 정의 가능
  type Student = {
    name: string;
    age: number;
  };

  // Student 오브젝트에 name string, age number를 할당했기에,
  // 아래 오브젝트안에서도 그 타입을 따라야한다.
  const student: Student = {
    name: "ellie",
    age: 12,
  };

  /**
   * String Literal Types
   */

  // 'name'만 할당할 수 있는 타입도 선언할 수 있다.
  type Name = "name";
  let ellieName: Name;
  ellieName = "name";

  type JSON = "json";
  const json: JSON = "json";

  type Boal = true;
}
