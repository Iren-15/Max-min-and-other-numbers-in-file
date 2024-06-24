const maxNum = document.querySelector(".maxN");
const minNum = document.querySelector(".minN");
const averageNum = document.querySelector(".averageN");
const medianNum = document.querySelector(".medianN");
const increasingSequence = document.querySelector("#resIncSequence");
const descendingSequence = document.querySelector("#resDesSequence");
const loader = document.querySelector(".loader");

file.addEventListener("click", function () {
  maxNum.innerText="";
  minNum.innerText = "";
  averageNum.innerText = "";
  medianNum.innerText = "";
  maxNum.classList.remove("resstyle");
  minNum.classList.remove("resstyle");
  averageNum.classList.remove("resstyle");
  medianNum.classList.remove("resstyle");
  increasingSequence.innerText = "";
  descendingSequence.innerText = "";
})

document.querySelector(".btn").addEventListener("click", function () {
  loader.style.display = "block";
  let file = document.getElementById("file").files[0];
  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function (e) {
    let content = e.target.result;
    let numbers = content.trim().split("\n").map(Number);
    maxNum.classList.add("resstyle");
    minNum.classList.add("resstyle");
    averageNum.classList.add("resstyle");
    medianNum.classList.add("resstyle");

    if (numbers.length > 0) {
      //Знаходження максимального та мінімального числа
      let maxNumber = numbers[0];
      let minNumber = numbers[0];
      for (let i = 1; i < numbers.length; i++) {
        if (maxNumber < numbers[i]) {
          maxNumber = numbers[i];
        }
        if (minNumber > numbers[i]) {
          minNumber = numbers[i];
        }
      }
      maxNum.innerText = maxNumber;
      minNum.innerText = minNumber;

      //Розрахунок середнього арифметичного
      let sumNumbers = numbers.reduce(function (sum, elem) {
        return sum + elem;
      });
      averageNum.innerText = (sumNumbers / numbers.length).toFixed(2);

      //Розрахунок медіани
      let numbersclon = numbers.slice();
      let sortNumbers = numbersclon.sort(function (a, b) {
        return a - b;
      });
      let median;
      if (numbers.length % 2 == 0) {
        //парна кількість чисел в файлі
        median =
          (sortNumbers[sortNumbers.length / 2 - 1] +
            sortNumbers[sortNumbers.length / 2]) /
          2;
      } else {
        //не парна кількість чисел в файлі
        median = sortNumbers[(sortNumbers.length - 1) / 2];
      }
      medianNum.innerText = median;

      //можно так, но циклом (без сортировки) быстрее считает, если только мін и мах надо найти
      //console.log(`Максимальне число з файла '${file.name}': ${sortNumbers[numbers.length - 1]}`)
      //console.log(`Мінімальне число з файла '${file.name}': ${sortNumbers[0]}`)

      //Знаходження найбільшої послідовності чисел (які ідуть один за одним), яка збільшується
      let start = 0;
      let end = 0;
      let index = 0;
      console.log(numbers);
      while (index < numbers.length - 1) {
        let indexStart = index;
        while (
          index < numbers.length - 1 &&
          numbers[index] < numbers[index + 1]
        ) {
          index++;
        }
        if (index - indexStart > end - start) {
          start = indexStart;
          end = index;
        }
        while (
          index < numbers.length - 1 &&
          numbers[index] >= numbers[index + 1]
        ) {
          index++;
        }
      }
      let arr = [];
      for (i = start; i <= end; i++) {
        arr.push(numbers[i]);
      }
      increasingSequence.innerText = arr;

      //Знаходження найбільшої послідовності чисел (які ідуть один за одним), яка зменшується
      let startSeq = 0;
      let endSeq = 0;
      let indexCurrent = 0;
      console.log(numbers);
      while (indexCurrent < numbers.length - 1) {
        let currentStart = indexCurrent;
        while (
          indexCurrent < numbers.length - 1 &&
          numbers[indexCurrent] > numbers[indexCurrent + 1]
        ) {
          indexCurrent++;
        }
        if (indexCurrent - currentStart > endSeq - startSeq) {
          startSeq = currentStart;
          endSeq = indexCurrent;
        }
        while (
          indexCurrent < numbers.length - 1 &&
          numbers[indexCurrent] <= numbers[indexCurrent + 1]
        ) {
          indexCurrent++;
        }
      }
      let array = [];
      for (i = startSeq; i <= endSeq; i++) {
        console.log(numbers[i]);
        array.push(numbers[i]);
      }
      console.log(array);
      descendingSequence.innerText = array;

      loader.style.display = "none";

    } else {
      console.log("error");
    }
  };
  reader.onerror = function () {
    console.log(reader.error);
  };
});
