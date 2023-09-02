# TA ACADEMY_2

## Initial setup
_____________________________________


### Install all programms
- [VSCode](https://code.visualstudio.com/)
- [GIT CLI](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/) download the LTS version
- [Yarn v1](https://classic.yarnpkg.com/en/docs/install) - You can scroll to `Alternatives` section to install it without npm

### VSCode setup
- Install plugins:
    - Eslint
    - Prettier
    - Playwright

### Git setup:
- [Generate new ssh key with](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent):
```sh 
ssh-keygen -t ed25519 -C "your_email@example.com"

eval "$(ssh-agent -s)" - Start the ssh-agent in the background.

ssh-add ~/.ssh/id_ed25519 - Add your SSH private key to the ssh-agent.

cat ~/.ssh/id_ed25519.pub - Get public key in terminal, copy all line including "your_email@example.com"
```
- [Add ssh key to your git account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
    - [Open git's `keys` page](https://github.com/settings/keys)
    - Click `New SSH key`, fill `Title` & `Key`
- Set `email` & `username`:
```sh
git config --global user.email "example@example.com"
git config --global user.name "FIRST_NAME LAST_NAME"
```

### Github workflow:
____________________________

Create a fork from the root repository [ta-academy_2](https://github.com/optimaxdev/ta-academy_2)

![fork.png](images%2Ffork.png)

Then go to `Settings` and add collaborators:

![collaborators.png](images%2Fcollaborators.png)

Open your terminal and clone your forked repository by SSH:
```
git clone git@github.com:your-nickname/your-project.git 
```

![clone.png](images%2Fclone.png)


### Work with branches:
________________________________

1) First of all add the name to the remote repository by the command:

``` 
git remote add academy git@github.com:optimaxdev/ta-academy_2.git
```
- academy - short name to your remote repository
- git@github.com:optimaxdev/ta-academy_2.git - path to the remote repository by SSH

Then run this command:
``` 
git config pull.rebase false
```

2) Checkout to the new branch related to the lesson(e.g. "homework_1"):

``` 
git checkout -b homework_1
```
Add your changes

Then commit and push your changes to your local branch (not master!)

``` 
git status
git add .
git commit -m "your-commit-message"
git push origin homework_1
```

Then open your own repository and click "Compare & pull request":

![pr.png](images%2Fpr.png)

Change base repository to yours (not optimax_dev!), add reviewers at the right side and click "Create pull request":

![master.png](images%2Fmaster.png)


After reviewers approve and merge your pull request, to update your local master make following commands:

``` 
git checkout master
git pull origin master
``` 

#### Synchronize repositories
_______
To get updates from remote repository to yours:

```
git checkout master
git pull academy master
``` 
Enter commit message

![merge-message.png](images%2Fmerge-message.png)

``` 
git push origin master
``` 
