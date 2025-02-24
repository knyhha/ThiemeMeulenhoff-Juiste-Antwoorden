// Werkt niet voor sommige soorten oefeningen!
const SELECTORS = ['qti-text-entry-interaction', 'qti-gap', 'qti-choice-interaction', 'qti-match-interaction'];

document.querySelector('button[title="Juiste antwoorden"]').addEventListener('click', () => {
    let answers = SELECTORS.flatMap(selector => 
        [...document.querySelectorAll(selector)]
            .flatMap(element => 
                [...(element.shadowRoot?.querySelectorAll('.correct-answer') || [])]
                    .map(answerElement => answerElement.textContent.trim())
                    .filter(answer => answer)
            )
    );

    if (answers.length > 0) {
        console.table(answers);
        document.getElementById('answers-container')?.remove();

        const container = document.createElement('div');
        container.id = 'answers-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            padding: 20px;
            border: 2px solid #32aba0;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            max-width: 300px;
            font-family: 'Roboto', sans-serif; /* Новый шрифт */
            font-size: 14px;
            color: #333;
            z-index: 1000;
            border-radius: 8px;
            text-align: left;
        `;

        const title = document.createElement('h3');
        title.textContent = 'Juiste antwoorden';
        title.style.cssText = "margin: 0 0 10px; font-size: 18px; color: #32aba0;";
        container.appendChild(title);

        answers.forEach((answer, index) => {
            const answerElement = document.createElement('p');
            answerElement.textContent = `${index + 1}: ${answer}`;
            answerElement.style.cssText = "margin: 5px 0; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 16px;";
            container.appendChild(answerElement);
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'SLUITEN';
        closeButton.style.cssText = `
            margin-top: 10px;
            padding: 12px 20px;
            background: #dc3545;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        `;
        closeButton.onclick = () => container.remove();
        container.appendChild(closeButton);

        const githubLink = document.createElement('p');
        githubLink.style.cssText = "margin-top: 10px; font-size: 14px; text-align: center;";
        const link = document.createElement('a');
        link.href = 'https://github.com/yourusername';
        link.textContent = 'GitHub';
        link.style.cssText = 'color: #000000; text-decoration: none;';
        githubLink.appendChild(link);
        container.appendChild(githubLink);

        document.body.appendChild(container);
    }
});
