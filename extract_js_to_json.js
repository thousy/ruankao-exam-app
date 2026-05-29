const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.startsWith('ocr_questions_ch') && f.endsWith('.js'));
let allQuestions = [];

for (const file of files) {
    try {
        const content = fs.readFileSync(file, 'utf-8');
        // Hacky but works for pure data JS:
        // We find the variable name and then eval it.
        const match = content.match(/const\s+(\w+)\s*=\s*\[/);
        let varName = match ? match[1] : null;

        if (!varName) {
            // Some might use "let" or "var"
            const match2 = content.match(/(let|var)\s+(\w+)\s*=\s*\[/);
            varName = match2 ? match2[2] : null;
        }
        
        if (varName) {
            // Append an export to let us grab the data
            const evalContent = content + `\nreturn ${varName};`;
            const data = (new Function(evalContent))();
            
            // Add sourceFile to each item
            data.forEach(item => {
                item.sourceFile = file;
                allQuestions.push(item);
            });
            console.log(`Extracting ${file}: ${data.length} questions`);
        } else {
            console.log(`Could not find variable in ${file}`);
        }
    } catch(e) {
        console.error(`Error parsing ${file}: ${e.message}`);
    }
}

fs.writeFileSync('all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('Successfully wrote all_questions.json');
