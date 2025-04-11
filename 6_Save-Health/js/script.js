console.log('Script connected');

const arrayOfAdvice = []

fetch('js/advice.json')
    .then(response => response.json())
    .then(data => {
        data.forEach((item) => {
            arrayOfAdvice.push(item)
        })
        console.log(arrayOfAdvice)
    })
    .catch(error => console.error('Помилка при зчитування advice:', error))

document.getElementById('btn_advice').addEventListener('click', () => {
    console.log('Button clicked');
    let index = Math.floor(Math.random() * arrayOfAdvice.length);
    document.getElementById('p-advice').innerText = arrayOfAdvice[index];
})

const arrayOfGalleryImeges = [
    '1.jpg',
    '2.jpg',
    '3.jpg'
]

let showmessage = 1;

document.getElementById('fixed-message').style.animation = 'none'
document.getElementById('fixed-message-container').style.visibility = 'hidden'

if (showmessage){
    setTimeout(() => {
        document.getElementById('fixed-message').style.transform = 'translateX(0px)'
    }, 2000);

    setTimeout(() => {
        document.getElementById('fixed-message').style.animation = 'swing 1s ease-in-out infinite'
    }, 3000);

    showmessage = 0;
}
document.getElementById('fixed-message').addEventListener('click', () => {
    console.log('❗ clicked')
    document.getElementById('fixed-message').style.visibility = 'hidden'
    document.getElementById('fixed-message-container').style.visibility = 'visible'
    document.getElementById('fixed-message-container').style.transform = 'translateX(0px)'
    document.getElementById('fixed-message-container').style.transform = 'translateY(0px)'
    document.getElementById('fixed-message-container').style.transform = 'scale(1, 1)'
});

setTimeout(() => {
    document.getElementById('fixed-message').remove();
    console.log('animation removed')
}, 90000);


document.getElementById('btn-close').addEventListener('click', () => {
    console.log('button close clicked')
    document.getElementById('fixed-message-container').style.visibility = 'hidden'
})

document.getElementById('btn-open').addEventListener('click', () => {
    console.log('button open clicked')
    document.getElementById('fixed-message-container').style.visibility = 'hidden'
})



let countOfPills = 5;
console.log('countOfPills ' + countOfPills);

let showAlert = 1;

document.getElementById('count-of-pills').innerText = '💊'.repeat(countOfPills);


document.getElementById('btn_advice').addEventListener('click', () => {
    console.log('Button clicked');
    countOfPills--;
    console.log('countOfPills ' + countOfPills);
    document.getElementById('count-of-pills').innerText =
        '💊'.repeat(countOfPills) + '❌'.repeat(5 - countOfPills);

    let randomIMG = Math.floor(Math.random() * 13) + 1;
    console.log('randomIMG ' + randomIMG);
    document.getElementById('medical-img').src = `img/gallery/${randomIMG}.png`;
    document.getElementById('medical-img').alt = 'Heart for U';

    document.getElementById('medical-img').style.display = 'flex';

    if (countOfPills == 0) {
        document.getElementById('btn_advice').disabled = true;
        document.getElementById('btn_advice').style.background = 'grey';
        document.getElementById('btn_advice').style.border = '5px solid grey';
        document.getElementById('btn_advice').style.cursor = 'not-allowed';
        if (showAlert) {
            alert('Придбати пігулки можна натиснувши кнопку "Купити💊"');
            showAlert = 0;
        }
    }
});

document.getElementById('btn-buy-pills').addEventListener('click', () => {
    countOfPills = 5;
    document.getElementById('count-of-pills').innerText = '💊'.repeat(
        countOfPills
    );
    document.getElementById('btn_advice').style.display = 'inline-block';
    document.getElementById('p-advice').innerText = '';
    document.getElementById('medical-img').style.display = 'none';
    document.getElementById('btn_advice').disabled = false;
    document.getElementById('btn_advice').style.background =
        'linear-gradient(90deg, #72d3ef, #4aa9c2)';
    document.getElementById('btn_advice').style.border =
        '5px solid rgba(54, 133, 158, 0.8)';
    document.getElementById('btn_advice').style.cursor = 'pointer';

    console.log('btn_buy-hearts clicked');
});


document.getElementById('btn_calculate').addEventListener('click', () => {
    console.log('Calculate clicked');

    let weight = parseFloat(document.getElementById('weight').value);
    console.log('weight ' + weight);

    let height = parseFloat(document.getElementById('height').value);
    console.log('height ' + height);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById('incorrect-value').innerText = 'Введено не коректне значення!'
        document.getElementById('incorrect-value').style.display = 'block'
        document.getElementById('your-imt').style.display='none'
        document.getElementById('your-imt-result').style.display='none'
        document.getElementById('your-imt-wish').style.display='none'
        console.log('Value is wrong')   
    } else {
        let heightinm=height*0.01
        console.log('heightinm ' + heightinm);
        let imtnoround = parseFloat(weight / heightinm ** 2);
        let imt =imtnoround.toFixed(1);
        console.log('IMT ' + imt);

        document.getElementById('your-imt').innerText = imt
        document.getElementById('your-imt').style.display='block'
        document.getElementById('your-imt-result').style.display='block'
        document.getElementById('your-imt-wish').style.display='block'
        document.getElementById('incorrect-value').style.display='none'
    
    if (imt<18.5) {
        document.getElementById('your-imt-result').innerText = '⚠️У ваc недостатня вага'
        document.getElementById('your-imt-wish').innerText = 'Можливий дефіцит поживних речовин. Рекомендується збалансоване харчування.'
    } else if (imt<25) {
        document.getElementById('your-imt-result').innerText = '✅Ваша вага в нормі'
        document.getElementById('your-imt-wish').innerText = 'Ваша вага в межах здорового діапазону. Підтримуйте активний спосіб життя.'
    } else if (imt<30) {
        document.getElementById('your-imt-result').innerText = '⚠️У ваc надмірна вага'
        document.getElementById('your-imt-wish').innerText = 'Варто звернути увагу на раціон та фізичну активність.'
    } else {
        document.getElementById('your-imt-result').innerText = '❗У вас ожиріння'
        document.getElementById('your-imt-wish').innerText = 'Ризик розвитку захворювань підвищений. Рекомендується консультація спеціаліста.'
    }
    }
});

let number = 0;
console.log('number ' + number);


document.getElementById('doctor-img').setAttribute('src', `img/pictures-gallery/${arrayOfGalleryImeges[number]}`)



document.getElementById('btn_right_arrow').addEventListener('click', () => {
    console.log('Right arrow clicked');

    setTimeout(() => {
        number++;
    if (number == arrayOfGalleryImeges.length) {
        number = 0;
    }
    document.getElementById('doctor-img').setAttribute('src', `img/pictures-gallery/${arrayOfGalleryImeges[number]}`)
}, 500);

    MyFunction_rigth()
    
})

document.getElementById('btn_left_arrow').addEventListener('click', () => {
    console.log('Left arrow clicked');
    setTimeout(() => {
        number--;
    if (number ==-1) {
        number = arrayOfGalleryImeges.length - 1;
    }
    document.getElementById('doctor-img').setAttribute('src', `img/pictures-gallery/${arrayOfGalleryImeges[number]}`)
}, 500);

    MyFunction_left()
    
});

function MyFunction_rigth() {

    console.log('My function right on');
    document.getElementById('doctor-img').style.transform = 'translateX(120%)'

    setTimeout(() => {
        document.getElementById('doctor-img').style.transform = 'translateX(-120%)'
        document.getElementById('doctor-img').style.opacity = '0'
    }, 300);

    setTimeout(() => {
        document.getElementById('doctor-img').style.opacity = '1'
        document.getElementById('doctor-img').style.transform = 'translateX(0px)'
    }, 600);
}

function MyFunction_left() {
    console.log('My function left on');
    document.getElementById('doctor-img').style.transform = 'translateX(-120%)'
    

    setTimeout(() => {
        document.getElementById('doctor-img').style.opacity = '0'
        document.getElementById('doctor-img').style.transform = 'translateX(120%)'
    }, 300);

    setTimeout(() => {
        document.getElementById('doctor-img').style.opacity = '1'
        document.getElementById('doctor-img').style.transform = 'translateX(0px)'
    }, 600);
}
 



fetch('js/vitamins.json')
.then(response => response.json())
.then(data =>{
    data.forEach((item) => {
        console.log(item)
        let divVitamin = document.createElement('div')
        divVitamin.classList.add('vitamin')
        divVitamin.innerHTML = `
                <p>${item.id}</p>
                <h3>${item.title}</h3>
                <hr>
                <div class="img-size">
                    <div class="photo-size">
                        <img class='photo' src ="img/vitamins/${item.photo}" onerror="this.onerror=null; this.src='img/vitamins/supplement.png';">
                    </div>   
                    <div class="scheme-size">
                        <img class='scheme' src = "img/vitamins/${item.scheme}" onerror="this.onerror=null; this.src='img/vitamins/scheme.png';">
                    </div>
                </div>
                <p class='description'>${item.description}</p>
                <div>
                    <span>${'🌟'.repeat(item.rating) + '❌'.repeat(5-item.rating)}</span>
                    <p>${item.type}</p>
                </div>
    `
    
    document.getElementById('p-vitamis').appendChild(divVitamin)
    
    })
})
.catch(error => console.error('Помилка отриманя вітамінів:', error));




