import { throws } from "assert";

{
  type CoffeeCup = {
    shots: number;
    hasmilk: boolean;
  };

  /**
   *  object마다 새로 만들어야 하는 변수는? 멤버 변수로 선언
   *  class로 함께 공유되는 변수는? static으로 구현 가능
   *  이는 함수로도 구현 가능 -> 호출할 때는 클래스. 을 꼭 붙여야 함
   *  ex) Math.abs() 이런게 가능한 것도 함수가 static으로 구현 되어 있는 것이다.
   *      즉, object를 따로 생성하지 않아도 바로 class 레벨에서 호출해서 사용가능하다.
   */
  // 내 class 안에 있는 멤버 변수 안에는 항상 this. 을 붙여서 접근한다.
  class CoffeeMaker {
    // class 내부의 fields는 let, const를 선언할 필요없다.
    // BEANS_GRAMM_PER_SHOT은 변하지 않는 숫자인데 멤버 변수로 선언하면
    // 클래스로 만든 오브젝트 마다 생성돼서 메모리 낭비가 된다.
    // static이라는 키워드를 통해 class level로 지정한다
    // 오브젝트마다 만들어지지 않는다. 그래서 this를 쓰지 않고, class의 명을 사용해야한다.
    // BEANS_GRAMM_PER_SHOT: number = 7;  // instance level
    static BEANS_GRAMM_PER_SHOT: number = 7;
    coffeeBeans: number = 0;

    // constructor는 class 를 만들 때 항상 호출되는 함수다.
    // 생성자에서 객체를 만들면서 온 파라미터로 field 값을 셋팅해줄 수 있다.
    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans; // this를 작성하지 않으면 함수 안에 들어온 인자를 가리킴
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }
    // class 내부의 method는 function을 선언할 필요없다.
    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      // this.coffeeBeans -= shots * this.BEANS_GRAMM_PER_SHOT; // BEANS_GRAMM_PER_SHOT이 static
      return {
        shots,
        hasmilk: false,
      };
    }
  }

  // 아래 class 명 뒤에 () 괄호가 붙으면서 생성자가 호출된다.
  const maker = new CoffeeMaker(32);
  console.log(maker);

  const maker2 = new CoffeeMaker(14);
  console.log(maker2);

  // class에서 static레벨로 CoffeeMaker객체를 리턴하는 함수를 만들어서
  // 객체를 만들지 않아도 class. 하고 바로 static함수 호출 가능
  const maker3 = CoffeeMaker.makeMachine(3);
}
