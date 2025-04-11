console.log('Script connected');

//Масив запитаннь та варіантів відповідей

const Questions = [
    {
        question: '1. Коли вам найкраще працюється або вчиться?',
        answers: [
            'Вранці, поки голова свіжа',
            'Після обіду, ближче до вечора',
            'Увечері або вночі',
            'В будь-який час, якщо добре виспався/лася',
        ],
    },
    {
        question: '2. Як ви прокидаєтеся без будильника?',
        answers: [
            'Дуже рано, навіть коли лягав/ла пізно',
            'Ближче до обіду, якщо немає справ',
            'Пізно ввечері, якщо давали можливість спати стільки, скільки хочеться',
            'Залежить від того, наскільки стомився/лася за день.',
        ],
    },
    {
        question: '3. Як почуваєтесь вранці після пробудження?',
        answers: [
            'Бадьорий/а, готовий/а до справ',
            'Сонний/а, але через годину приходжу в норму',
            'Жахливо, ненавиджу ранки',
            'По-різному, залежить від ситуації',
        ],
    },
    {
        question: '4. Коли у вас найвищий рівень енергії?',
        answers: [
            'Вранці, одразу після пробудження',
            'В обідній час',
            'Пізно ввечері або навіть вночі',
            'В різний час, немає чіткої закономірності',
        ],
    },
    {
        question: '5. Що для вас комфортніше: рано вставати чи пізно лягати?',
        answers: [
            'Рано вставати, люблю ранки',
            'Вставати не дуже рано, але не дуже пізно',
            'Пізно лягати, бо вечір - мій час',
            'По ситуації, можу і так, і так',
        ],
    },
];

//Порожній масив для value відповідей

const valuesArray = [];

let numberOfQuestion = 0;
console.log('Question = ' + numberOfQuestion);

//Функція для показування блоку з відгуками

function showResponse(){
    document.getElementById('fixed-response-container').style.transform = 'translateX(0px)'
    console.log('Блок з відгуками показан')
}

//Функція для блокування кнопки 'Продовжити' та зміна його стилів

function checkSelection() {
    let radios = document.querySelectorAll("input[name='answer']");
    let isDisabled = ![...radios].some((radio) => radio.checked);
    let continueBtn = document.getElementById('continue_btn');

    continueBtn.disabled = isDisabled;
    continueBtn.style.background = isDisabled
        ? 'grey'
        : 'linear-gradient(90deg, #2fbd1c, #19b604)';
    continueBtn.style.border = isDisabled
        ? '0px solid grey'
        : '0px solid white';
    continueBtn.style.cursor = isDisabled ? 'not-allowed' : 'pointer';

    continueBtn.onmouseenter = null;
    continueBtn.onmouseleave = null;

    if (!isDisabled) {
        continueBtn.onmouseenter = () => {
            continueBtn.style.boxShadow = '5px 10px 8px rgba(0, 0, 0, 0.2)';
            continueBtn.style.background = 'linear-gradient(90deg, #249617, #138d03)';
        };
        
        continueBtn.onmouseleave = () => {
            continueBtn.style.boxShadow = 'none';
            continueBtn.style.background = 'linear-gradient(90deg, #2fbd1c, #19b604)';
        };
    } else {
        continueBtn.style.boxShadow = 'none';
    }
}


//При виборі одного з варіантів відповідей кнопка 'Продовжити' розблоковується

document.querySelectorAll("input[name='answer']").forEach((radio) => {
    radio.addEventListener('change', checkSelection);
});

checkSelection();



document.getElementById('start_btn').addEventListener('click', () => {
    document.getElementsByClassName('main')[0].style.display = 'block';
    document.getElementById('start_btn').style.display = 'none';
    document.getElementById('back-to-site_btn').style.marginTop = '0px';
})

document.getElementById('continue_btn').addEventListener('click', () => {
    numberOfQuestion++;
    checkSelection();

    console.log('Question = ' + numberOfQuestion);

    //Заміна назви кнопки 'Продовжити' на 'Завершити тест'

    if (numberOfQuestion == 4) {
        document.getElementById('continue_btn').innerText = 'Завершити тест';
    }

    //Виведення результату

    if (numberOfQuestion == 5) {
        console.log(valuesArray);
        submitTest();
        document.getElementById('question').innerText = 'Ваш результат:';
        document.getElementById('continue_btn').style.display = 'none';
        document
            .querySelectorAll('.radio_btn')
            .forEach((el) => (el.style.display = 'none'));
        document.getElementById('redo-test_btn').style.display = 'inline';
        document
            .querySelectorAll('.site-footer')
            .forEach((el) => (el.style.justifyContent = 'space-around'));
        document
            .querySelectorAll('.result')
            .forEach((el) => (el.style.display = 'flex'));
        showResponse()
    }

    //Для правильної заміни варіанті відповідей та питань
    if (numberOfQuestion < Questions.length) {
        document.getElementById('question').innerText =
            Questions[numberOfQuestion].question;
        let labels = document.querySelectorAll('label.radio_btn');

        Questions[numberOfQuestion].answers.forEach((answer, index) => {
            if (labels[index]) {
                labels[index].innerText = answer;
            }
        });
    }
});

//Функція яка виконується при натиску на кнопку 'Продовжити'
function resetSelection() {
    //Функція для переміщення вибраного value до масиву valuesArray
    let selectedValue = document.querySelector('input[name="answer"]:checked')?.value;
    console.log(selectedValue);
    valuesArray.push(selectedValue);

    //Функція для скидання варіанта відповіді при переході на наступне
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
    });
}

//Функція для підрахування результату та виведення відповідного тексту

function submitTest() {
    const freq = {};
    let result = null;

    valuesArray.forEach((val) => {
        freq[val] = (freq[val] || 0) + 1;
        if (freq[val] === 2) {
            result = val;
        }
    });

    console.log('Найчастіше вибране '+result);

    if (result === 'A') {
        document.getElementById('name-result').innerText = 'Ви - Жайворонок🦜';
        document.getElementById('info-result').innerText =
            'Ви активні вранці, швидко прокидаєтесь і любите починати справи зранку. Вечірня продуктивність знижується.';
    }
    if (result === 'C') {
        document.getElementById('name-result').innerText = 'Ви - Сова🦉';
        document.getElementById('info-result').innerText =
            'Найбільший пік активності – у вечірній та нічний час. Вранці прокидатися важко, а в першій половині дня ви ще сонний/а.';
    }
    if (result === 'B') {
        document.getElementById('name-result').innerText = 'Ви - Голуб🕊';
        document.getElementById('info-result').innerText =
            'Ваш хронотип змішаний, ви можете працювати і вранці, і ввечері, але найбільше енергії маєте вдень.';
    }
    if (result === 'D') {
        document.getElementById('name-result').innerText =
            'Ви - Змішаний тип🔄';
        document.getElementById('info-result').innerText =
            'Ви адаптуєтесь під обставини, ваш ритм життя гнучкий, і ви можете ефективно працювати у будь-який час.';
    }
}


document.getElementById('btn-response').addEventListener('click', () => {
    setTimeout(() => {
        document.getElementById('fixed-response-container').style.transform = 'translateY(-150px)'
        document.getElementById('fixed-response-h3').innerText = 'Дякуємо за ваш відгук!';
        document.getElementById('fixed-response').style.display = 'none';
        document.getElementById('fixed-response-input').style.display = 'none';
        document.getElementById('btn-response').style.display = 'none';
    },100)
    setTimeout(() => {
        document.getElementById('fixed-response-container').style.opacity = '0';
    },2000)
})


function sendFeedback() {
    let text = document.getElementById("fixed-response-input").value;
    if (text.trim() === "") {
        alert("Введіть повідомлення!");
        return;
    }

    fetch('/send-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
    })
    .then(async res => {
        if (res.status === 204) {
            return {};
        }
        return res.json();
    })
    .then(data => {
        if (data.status) {
            alert(data.status);
        }
        document.getElementById("fixed-response-input").value = "";
    })
    .catch(err => {
        alert('Помилка при надсиланні');
        console.error(err);
    });
}