{
  /**
   * Type Assertions ๐ฉ
   */

  // ์๋ฐ์คํฌ๋ฆฝํธ๋ ํ์์ด ์์ด์ ํ์์คํธ๋ฆฝํธ๊ฐ ์ ํ ์ ์ ์์ด์ any๋ฅผ ์ด๋ค.
  function jsStrFunc(): any {
    return "๋๊ธฐ๋ฅ๊ฐ~"
    return 2;
  }
  // ๊ทผ๋ฐ anyํ์์ด๊ธฐ ๋๋ฌธ์ ๋ฌธ์์ด ๊ด๋ จ length๋ณ์๋ฅผ ์ฌ์ฉํ  ์๊ฐ ์๋ค ใ 
  // ๊ทธ๋์ casting์ ์๋์ฒ๋ผ ํ  ์๊ฐ ์๋ค. 
  const result = jsStrFunc();
  console.log((result as string).length);
  // ๊ทธ๋์  ๋ง์ฝ 2๋ฅผ ๋ฆฌํดํ๋๋ฐ length๋ฅผ ํ๋ค? ๊ทธ๋ผ undefined๋ก ๋์จ๋ค.
  // ์ดํ๋ฆฌ์ผ์ด์์ด ์ฃฝ์ง ์์ง๋ง,, undefined์ผ๋ก ๋์ด

  console.log((<string>result).length);

  const wrong: any = 5;

  // ๋ฐฐ์ด๋ก ์ฅ๋ดํ๊ธฐ ๋๋ญ์ push๋ฅผ ํ์ง๋ง,,,, wrong์ 5๋ผ๊ตฌ์! number,,๊ทธ๋ผ
  // push๋ ์ฌ์ฉํ  ์ ์๊ธฐ ๋๋ฌธ์ ์ดํ๋ฆฌ์ผ์ด์์ด ์ฃฝ์ด๋ฒ๋ฆผ
  console.log((wrong as Array<number>).push(1)); // ๐ฑ


  // ์ซ์๋ฅผ ์ฐพ์ผ๋ฉด number ์ด๋ ์ด๋ฅผ ๋ฆฌํดํ๊ณ  ๋ชป์ฐพ์ผ๋ฉด undefined ๋ฆฌํด
  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers()!;

  // numbers๋ ์ซ์๋ฐฐ์ด์ผ ์ ์์ง๋ง undefined์ผ์๋ ์์ด์,,
  // push๋ฅผ ์ธ์๊ฐ ์์!
  numbers.push(2); // ๐ฑ

  // ๊ทผ๋ฐ ! ๋๋ํ๋ฅผ ๋ถ์ด๋ฉด ๋ฌด์กฐ๊ฑด undefined์๋์ผ~! ๋ผ๋ ๋ง ์ฅ๋ดํด๋ฒ๋ฆผ
  // optional ? ๋ ๋ค๋ฆ
  numbers!.push(2); // ๐ฑ

  // querySelector ์์๊ฐ ์์ผ๋ฉด ๋ฆฌํดํ๊ณ , ์์ผ๋ฉด null๋ก ๋ฆฌํด
  const button = document.querySelector('class')!;
  // ์๋์ฒ๋ผ ์ฌ์ฉํ  ์ ์์ง๋ง, ์ ๋ง ์ฅ๋ดํ  ์ ์์ง๋ง
  if(button) {
    button.nodeValue; 
  }
  // ์ ๋ง ์ฅ๋ดํ  ์ ์์ผ๋ฉด ์๋์ฒ๋ผ ๋๋ํ๋ก ์ธ ์ ์๋ค.ํ์ง๋ง ๋น์ถ
  // const button = document.querySelector('class')!;

}
