{
  /**
   * Enum
   * 여러가지의 상수값들을 정의
   * 자바스크립트에선 const로 고정값으로 정의할 때 대문자로 정의함
   */
  // JavaScript
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  // object 수정불가능하게 가능
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;


  // TypeScript
  // 아래 enum을 사용하지 않고 type으로 선언해서 사용하는게 좋음
  // 그래야 타입이 보장이 된다. 
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';

  // 위의 Union String Literal로 대체되기 때문에 이넘 사용 지양하라
  // 왜냐하면 dayOfweek에 지정한 값 이외에 다른 값을 지정하면 오류가 나기 때문
  // 그래서 타입 보장이 되어 안전하다는 것!
  let dayOfweek: DaysOfWeek = 'Monday';
  dayOfweek = 'Wednesday';
}

  // enum정의 - enum에서는 앞글자만 대문자 나머지 소문자
  // enum에서 값을 지정하지 않으면 첫 변수부터 0으로 지정됨
  enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Days.Monday);

  // enum 사용은 지양해야함. 왜?
  // enum을 사용하면 Days 타입으로 할당했을 경우 Turesday로 할당했는데,
  // 그 이후에 갑자기 Days.TuesDay가 아닌 10을 할당해도 문제없이 실행됨
  // 타입이 보장되지가 않아버림 
  let day: Days = Days.Saturday;
  day = Days.Tuesday;
  day = 10;
  console.log(day); 


    // // enum에서 값을 지정하지 않으면 첫 변수부터 0으로 지정됨
    // // 상수값을 묶어서 사용해도됨
    // enum Days {
    //   Monday = 'mon',
    //   Tuesday = 'tue',
    //   Wednesday,
    //   Thursday,
    //   Friday,
    //   Saturday,
    //   Sunday,
    // }


