{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  /**
   * interface 는 야! 나란 소통하려면 이런 규약을 가지고 있어! 라는 계약서 같은 것
   * CoffeeMaker라는 인터페이스에서는
   * makeCoffee라는 함수가 있고, shots라는 넘버타입을 받고 CoffeeCup을 리턴해!
   * 라고 구체적으로 명시한다.
   * 인터페이스는 외부적으로 사용하는 것이기 때문에 오히려 간단하게 이름 짓고
   * 구현부인 클래스에서 좀 구체적으로 이름을 짓는 편
   * 클래스는, 인터페이스를 구현하는 아이
   */
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  /**
   * CoffeeMachine 클래스는 CoffeeMaker 인터페이스를 구현하는 클래스이다.
   * 그래서 Interface인 CoffeeMaker에 정의해놓은 모든 함수를 구현해야한다.
   * 인터페이스를 사용해서 추상화를 극대화해서 사용할 수 있다.
   * class대신 인터페이스를 통해서 객체를 만들면 밖에서 그 인터페이스에 구현된 함수만
   * 호출할 수 았기 때문에 밖에서 보여주고 싶지 않은 함수는 구현부인 class에 넣고
   * 인터페이스에는 밖에서 보여줄 함수만 넣어줘도 됨
   * 그리고 인터페이스로 객체를 만들면 됨
   *
   * 아래는 2가지의 인터페이스 규약을 다 따라가는 class임
   */
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    // CommercialCoffeeMaker의 clean함수도 구현해줌.
    // 인터페이스의 규약을 따라가야하기 떄문에! implements 했잖슴
    clean() {
      console.log("cleaning the machine...🧼");
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up... 🔥");
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots... ☕️`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    // CormmercialCoffeeMaker 인터페이스
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  /* 위 처럼 객체 생성 후 maker. 을 하면 CoffeeMachine class가 가진
      함수들이 보여서 어떤 함수를 호출해야할 지 헷갈릴 수 있다.
      하지만 정말 밖에서 호출할 함수를 제외하고 함수 앞에 private을 붙이면
      외부에서 호출할 때 보이지 않기 때문에 호출이 필요한 함수만 구분할 수 있다.
      이런것을 추상화라고 한다. 
  */

  /*  동일한 CoffeeMachine의 객체인 maker를 전달하더라도
      class로 AmateurUser, ProBarista 각각 구현한 곳을 보면
      서로 다른 인터페이스를 받아오기 때문에 서로 규약된 제한된 함수만 쓸 수 있어서
      사용할 수 있는 함수가 달라진다.
 */
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);
  pro.makeCoffee();

  // 즉! CoffeeMachine이라는 동일한 오브젝트라 하더라도,
  // 서로 다른 인터페이스를 생성자에서 구현하기 때문에
  // class보다 좁은 범위의 인터페이스에서 규약된 함수만 접근 가능함!
}
