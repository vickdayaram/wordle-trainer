var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/vddayara/wordle-trainer.git', // Update to point to your repository  
        user: {
            name: 'Pradeep Dayaram', // update to use your name
            email: 'vickdayaram@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)