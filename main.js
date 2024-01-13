const arrayContainer = document.getElementById("array-container");
const submitBtn = document.getElementById("submit-btn");
const input = document.getElementById("input");
const inputContainer = document.getElementById("input-div");

class ArraySort {
  constructor(array) {
    this.array = array;
    this.len = array.length;
    this.createArray();
    this.backUp = [...array];
  }

  async bubbleSort() {
    for (let i = 0; i < this.len - 1; i++) {
      for (let j = i + 1; j < this.len; j++) {
        if (this.array[i] > this.array[j]) {
          let temp = this.array[i];
          await this.updateColorRed(j);
          this.array[i] = this.array[j];
          await this.updateDom(i, this.array[j]);
          await this.updateColorGreen(i);
          this.array[j] = temp;
          await this.updateDom(j, temp);
          await this.resetColor(j);
        } else {
          await this.updateColorGreen(i);
        }
      }
    }
    this.updateColorGreen(this.len - 1);
    this.print();
  }

  async selectionSort() {
    for (let i = 0; i < this.len; i++) {
      let min = i;
      for (let j = i + 1; j < this.len; j++) {
        if (this.array[j] < this.array[min]) {
          min = j;
          await this.updateColorRed(j);
        }
      }
      let temp = this.array[i];
      this.array[i] = this.array[min];
      await this.resetColor(min);
      await this.updateColorGreen(i);
      await this.updateDom(i, this.array[min]);
      this.array[min] = temp;
      await this.updateDom(min, temp);
    }

    this.print();
  }

  async insertionSort() {
    for (let i = 0; i < this.len - 1; i++) {
      let j = i + 1;
      let prev = i;
      while (this.array[j] < this.array[prev] && j >= 0) {
        await this.updateColorRed(j);
        let temp = this.array[j];
        this.array[j] = this.array[prev];
        await this.updateDom(j, this.array[prev]);
        this.array[prev] = temp;
        await this.updateDom(prev, temp);
        if (j < i) {
          await this.updateColorGreen(j);
        } else {
          await this.resetColor(j);
        }
        j--;
        prev--;
      }
      await this.updateColorGreen(i);
    }
    await this.updateColorGreen(this.len - 1);
  }

  print() {
    console.log(`Array after sorting: ${this.array}`);
  }

  createArray() {
    if (arrayContainer != "") {
      arrayContainer.innerHTML = "";
    }
    this.array.forEach((item, index) => {
      arrayContainer.innerHTML += `<div class="cell" id="${index}">${item}</div>`;
    });
  }

  async sleep(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  async updateDom(id, val) {
    document.getElementById(id).innerText = val;
    await this.sleep(50);
  }

  async updateColorGreen(id) {
    document.getElementById(id).className = "cell green";
    await this.sleep(50);
  }

  async updateColorRed(id) {
    document.getElementById(id).className = "cell red";
    await this.sleep(50);
  }

  async resetColor(id) {
    document.getElementById(id).className = "cell";
    await this.sleep(50);
  }

  reset() {
    this.array = [...this.backUp];
    this.createArray();
  }
}

let arr;

function createArray() {
  const value = input.value;
  let array = value.split(",").map((item) => parseInt(item.trim()));
  inputContainer.className = "hidden";
  submitBtn.innerText = "Reset";
  submitBtn.onclick = resetArray;
  arr = new ArraySort(array);
}

document.getElementById("bubbleSort").addEventListener("click", callSort);
document.getElementById("selectionSort").addEventListener("click", callSort);
document.getElementById("insertionSort").addEventListener("click", callSort);

function callSort(e) {
  const name = e.target.id;

  switch (name) {
    case "bubbleSort":
      arr.bubbleSort();
      break;
    case "selectionSort":
      arr.selectionSort();
      break;
    case "insertionSort":
      arr.insertionSort();
      break;
  }
}

function resetArray() {
  arr.reset();
}
