import styles from './index.css';

document.addEventListener("DOMContentLoaded", function(event) {
  const app = document.querySelector('#app');
  let timer;

  let current = 0;
  const { next, pre } = createClockNumbers();
  const div = document.createElement('div');
  const divB = document.createElement('div');
  const divCurrent = document.createElement('div');
  const divA = document.createElement('div');

  const add = () => {
    current = next[current];
    divCurrent.className = `${styles.test} ${styles.moveTop}`;
    divB.className = `${styles.test} ${styles.moveTop}`;
    divA.className = `${styles.test} ${styles.moveTop}`;

    timer = setTimeout(() => {
      divCurrent.innerHTML = current.toString();
      divCurrent.className = `${styles.test}`;
      divB.className = `${styles.test}`;
      divA.className = `${styles.test}`;

      divB.innerHTML = pre[current];
      divA.innerText = next[current];

      clearTimeout(timer);
    }, 100);
  };

  const minus = () => {
    current = pre[current];
    divCurrent.className = `${styles.test} ${styles.moveDown}`;
    divB.className = `${styles.test} ${styles.moveDown}`;
    divA.className = `${styles.test} ${styles.moveDown}`;

    timer = setTimeout(() => {
      divCurrent.innerHTML = current.toString();
      divCurrent.className = `${styles.test}`;
      divB.className = `${styles.test}`;
      divA.className = `${styles.test}`;

      divB.innerHTML = pre[current];
      divA.innerText = next[current];

      clearTimeout(timer);
    }, 100);
  };

  const btnNext = document.createElement('button');
  btnNext.addEventListener('click', (e) => {
    add();
  });

  const btnPre = document.createElement('button');
  btnPre.addEventListener('click', (e) => {
    minus();
  });

  divCurrent.innerHTML = current.toString();
  divCurrent.className = styles.test;

  divB.className = styles.test;
  divA.className = styles.test;

  divB.innerHTML = pre[current];
  divA.innerText = next[current];

  btnNext.innerHTML = '<i class="material-icons">keyboard_arrow_up</i>';
  btnPre.innerHTML = '<i class="material-icons">keyboard_arrow_down</i>';


  div.className = styles.border;
  div.appendChild(divB);
  div.appendChild(divCurrent);
  div.appendChild(divA);

  app.appendChild(btnNext);
  app.appendChild(div);
  app.appendChild(btnPre);

  div.scrollTo(0, 25);

});

const createClockNumbers = (next = new Array(10), pre = new Array(10), i = 0) => {
  if (i === 9) {
    next[i] = 0;
    pre[i] = i - 1;
    return { next, pre };
  }

  if (i === 0) {
    pre[i] = 9;
  } else {
    pre[i] = i - 1;
  }

  next[i] = i + 1;
  return createClockNumbers(next, pre, i + 1);
};