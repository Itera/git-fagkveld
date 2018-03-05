# Exercise 1

In this exercise, you will learn some basic Git commands.

If you haven't already, go through the "Getting started" guide in the README of the root folder.

OK, so now we will start to work on some of the basics of Git.

## Creating a branch

To avoid getting in the way of others, we will create a branch that we can work in.

To create a branch, you can run the command following command:
`git branch <your-branch-name>`. Try to select a unique branch name.

If you type `git branch` this should show a list, containing the branch you just created.
Next you can run `git status`. This is a useful command, which gives you information about the current git status of the repository you are in.
As you can see from the result of the command, even though you created a new branch, you are still pointing to the `master` branch.
To checkout your branch run `git checkout <your-branch-name>`.

👉 Tips: You can do both the creation of the branch and the checkout in one command by running `git checkout -b <your-branch-name>`.

Now the branch should be checked out on your computer.

Now we will move on to creating a commit.

## Committing changes

### Change the file

We have added a simple text file for you in this folder. Now we will commit a change to this file.
First you need to change the content of the file. Open it, and change the text, and save the file.
Now run `git status` again to see what has happened.

### Stage the file

As you can see the file has been `modified`, but the file
is not in the staging area. To be able to commit the change, you need to add the file to the staging area.
Do it by running `git add <filename>`. If you run `git status` again, you can see that the file has been moved to the staging area!

👉 Tips: If you want to stage your changes to the repository, you can do use the command `git add -A`. You can also stage only the files in the current folder by running `git add .`

### Commit the file

To commit the file, run `git commit`. This will open the default editor of Git. Add a commit message. Remember the 'best practises' presented earlier. Try to create a good and meaningful commit message. Save and close the editor.

👉 Tips: If you want to change the editor, run `git config --global core.editor "<path-to-editor>"`. If you cannot escape the default editor, ask one of the instructors.

## Push the commit

Now run `git push` to push your changes to the remote branch.

As you can see, this does not work. The reason is that we created the branch locally, but never pushed the branch to the remote respository.

👉 Tips: Run `git branch -r` to view remote branches.

To push the branch, run the command `git push --set-upstream origin <your-branch-name>`. This was also suggested to you by Git!

Now try to run `git push` again. This time your changes should be successfully pushed, and you are done with exercise 1!
