{
  // Array
  const fruits: string[] = ['🍅', '🍌']; // 선호 readonly가 가능
  const scroes: Array<number> = [1, 3, 4];
  function printArray(fruits: readonly string[]) {}
  // readonly가 많이 쓰인다. => 파라미터 값을 읽을 수만 있고 변경할 수가 없음.
  // string[] 방식으로만 배열을 선언해야 readonly가 가능함

  // Tuple -> interface, type alias, class
  // 고정된 사이즈의 서로 다른 타입이 있을 때 사용 가능
  // 배열인데, 내부 데이터가 타입이 다른 경우 그것이 튜플임
  let student: [string, number];
  student = ['name', 123];

  // 튜플 내부에 있는 데이터에 접근하기 위해서는 배열에서 접근한 것 처럼 해야함
  // 튜플 사용을 권장하지 않음. index로 데이터에 접근하는게 가독성이 너무 떨어진다.
  // object, class 형태로 사용하자!
  // 튜플을 사용할 수 있는 곳에는 interface나 type alias나 class로 대체해서 사용하라

  student[0]; // name   
  student[1]; // 123

  // object distructuring을 구조할당!을 사용하면 
  // 좀 더 가독성이 올라감
  const [name, age] = student;

  // 튜플을 사용하는 예제
  // React의 useState는 튜플의 형태로 리턴됨
}
