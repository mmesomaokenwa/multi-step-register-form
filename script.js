window.onload = function () {
    const forms = document.querySelectorAll('form');
    const submitBtn = document.querySelectorAll('.submit-btn');
    const topics = document.querySelectorAll('.topic');
    const bars = document.querySelectorAll('.bar');
    const progress = document.querySelector('.progress-text');

    topics.forEach(topic => {
        topic.addEventListener('click', () => {
            topic.classList.toggle('chosen');
        })
    })

    // Event Listener for Submit Button on Form 1
    submitBtn[0].addEventListener('click', function () {
        if (validateForm(forms[0])) {
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let nameInput = document.querySelector('.name');
            let emailInput = document.querySelector('.email');
            localStorage.setItem("userName", name);
            localStorage.setItem('userEmail', email);
            nameInput.textContent = name;
            emailInput.textContent = email;

            forms[0].style.transform = 'translateX(-100%)';
            forms[1].style.transform = 'translateX(0)';
            bars[1].classList.add('current');
            progress.innerHTML = 'Step 2 of 3';
        } else {
            alert('Please fill in all fields correctly!');
        }
    });
    
    submitBtn[1].addEventListener('click', function () {
        if (validateTopics(topics)) {
            const topicsChosen = createListOfTopics(topics);
            localStorage.setItem('topics', JSON.stringify(topicsChosen));
            for (const chosen of topicsChosen) {
                const list = document.getElementById('topics');
                const li = document.createElement('li');
                li.textContent = chosen;
                list.appendChild(li);
            }

            forms[1].style.transform = 'translateX(-100%)';
            forms[2].style.transform = 'translateX(0)';
            bars[2].classList.add('current');
            progress.innerHTML = 'Step 3 of 3';
        } else {
            alert('At least one topic must be selected!');
        }
    });
    
    submitBtn[2].addEventListener('click', function () {
        alert('You have been registered successfully!');
    })

    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');

        for (const input of inputs) {
            if (!input.value.trim() || input.validity.typeMismatch) {
                return false;
            } 
        }

        return true;
    }
    
    function validateTopics(topics) {
        for (const topic of topics) {
            if (topic.classList.contains('chosen')) {
                return true;
            }
        }

        return false;
    }
    
    function createListOfTopics(topics) {
        let list = [];
        for (const topic of topics) {
            if (topic.classList.contains('chosen')) {
                list.push(topic.textContent);
            }
        }

        return list;
    }
}

 