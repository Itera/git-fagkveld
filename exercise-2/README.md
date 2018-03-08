# Exercise 2 - Changing commits, rebasing and merging

For this exercise, we have created a simple calculator you can run in the
browser. The code is just for having something to work with for the exercises,
and you don't need to do anything with the code, other than what is mentioned in
the tasks.

We will start working on the branch `feat/trigonometric-functions`, and doing
some changes there. Eventually, we will merge this branch into `master`.

## Part 1. Amend the last commit

For the first part, we want to change the most recent commit in the branch
`feat/trigonometric-functions`. The change you should do is to make the check for
NaN in `calc.js` use `Number.isNaN` instead of `isNaN`, as this function is more
strict. They take the same argument, so you don't need to change anything else.

```
-    if (!isNaN(result)) {
+    if (!Number.isNaN(result)) {
```

To include this into the previous commit you can run commit with the `--amend`
option:

```
git commit --amend
```

Note that you need to add the changes you want to include, or run commit with
the `-a` option to include all changes, just like you would with a normal
commit.

### A note about upstreams and diverging branches

If you run `git status` after doing this, you will see this message:

```
On branch feat/trigonometric-functions
Your branch and 'origin/feat/trigonometric-functions' have diverged,
and have 1 and 1 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)
```

When you check out a branch from a remote, git will set the remote branch as the
upstream. This means that this is where you push this branch by default, and
status will report how your branch differs from the remote branch. The reason it
says that they have diverged is that in the last task, you changed the last
commit. So the last commit in your local branch is a different one from the one
on the remote branch, i.e. it has a different commit hash.

Often when you rebase, it will be a local branch that you haven't pushed yet, so
this won't occur. However, if you do rebase a branch that exist on the remote
and want to push it, you will have to do what's called a force push, which
overwrites the branch on the remote. We are not going to push in this exercise,
so we won't go into details on this, but note that you should be careful when
force pushing, and make sure the other people using the repository are okay with
it.

Since we should't push in this exercise, the message doesn't matter for us and
you can ignore it. If you want to get rid of it though, you can unset the
upstream with:

```
git branch --unset-upstream
```

## Part 2. Fix an earlier commit

But what if the thing you want to change isn't from the most recent commit, but
further back in the log? It's still possible to change these commits, but you
will have to do it a bit differently. Now, you will first have to use the
`--fixup` option to commit, and then do an interactive rebase. This part will
cover the commit.

The change you should do is to hide the second number field by setting display
to none, instead of deactivating it. Like this:

```
-    number2Field.disabled = operationField.value === 'sin';
+    number2Field.style.display = operationField.value === 'sin' ? 'none' : '';
```

We would like this change to be a part of the commit "Deactivate the second
number field when the operation is sin". As mentioned, we do this by running
commit with the `--fixup` option. For this command, we need to specify the
revision of the commit we would like to change. You can specify the revision
however you like, as long as it points to that commit. The easiest is to copy
the commit hash from the log, so we'll use that here. Run `git log --oneline`,
and copy the hash from the line with that message.

```
git commit --fixup=<hash>
```

👉 Tip: Another way to specify the revision is `:/Deactivate`, which means the
most recent commit that includes `Deactivate` in the commit message. See the
man page for `gitrevisions` for every way you can specify a revision.

This will not change the original commit immediately though, since that would
change the history, which is not something the commit command should do.
Instead, a special commit that indicates that it belongs to an earlier commit
has been created. To combine these two commits we need to run an interactive
rebase. This will be the next task.

## Part 3. Interactive rebase

Interactive rebase can be used to change previous commits in several different
ways. In this case, we will use it to combine the commit created in the
previous task with an earlier commit. When running an interactive rebase, you
also have to specify a revision. The rebase will allow you to change all the
commits that comes after the revision you specify, up to the commit you started
the rebase from.

So in this case, we want to specify the parent of the original commit. You can
specify the parent of a revision by adding the suffix `~`. Therefore, the
revision you want to specify is the same hash as in the last command, with a `~`
at the end.

When running the rebase, we need to use the `--autosquash` option. This will
instruct rebase to treat the fixup commit specially so it will be included in
the previous commit. Without this option, it will just be treated as a normal
commit. This option can also be set in the config file with the key
`rebase.autoSquash`, so you don't have to specify it each time.

Now run the rebase command:

```
git rebase -i --autosquash <hash>~
```

This will open your editor with a list of commits in reverse order. You can see
that since we used the `--autosquash` option, the fixup commit we made is
prefixed with `fixup` instead of `pick` like the others, and it is placed right
after the original commit. This instructs rebase to merge these two commits.

You can change the contents here if you want to make more changes, e.g. edit a
commit or merge more commits, but for now we stick with fixing that one commit.
So all that's left to to is to exit the editor (if you made any changes, you
also need to save of course). If you use the default editor of git, which is
vim, this can be done with :q<Enter>. After exiting the editor, the rebase
operation will run, and the two commits will be merged.

## Part 4. Move the last commit into a new branch

Before we merge this branch into master, we realize that the last commit in the
branch doesn't really belong as part of this feature, so it should be in a
separate branch. Therefore, we would like to split this branch into two
branches, where the current branch, `feat/trigonometric-functions` keeps all the
commits except the last, and the new branch only contains the last commit on
top of master.

First we start by making the new branch. However, we don't want to check out the
branch yet. This can be done with the branch command.

```
git branch feat/dont-use-nan-result
```

Now we have a new branch, with exactly the same commits as the current branch.
We can therefore remove the last commit of the current branch to get it to the
state we want it. We can do this with the reset command, which changes the
current branch to the specified revision.

By using the `--keep` option, we change the files in the working directory as
well, since we don't want to keep the changes from the commit we remove. If you
have seen the `--hard` flag, that does a similar function. The difference is
that `--hard` will remove all changes in the working directory, while `--keep`
keeps local changes that hasn't been committed.

Since we should only remove the last commit, the revision we want to specify is
the commit before that, i.e. the parent commit of the current commit. The
current commit can be referenced with `HEAD`, and as in the previous part you
can use `~` to specify the parent. So we end up with:

```
git reset --keep HEAD~
```

Now `feat/trigonometric-functions` is in the state we want it, so we can move on
to the new branch.

```
git checkout feat/dont-use-nan-result
```

This contains all the commits we previously had. The branch is based out of
master, so we want to remove all the commits between master and the most recent
commit. We can do this using the rebase command.

The option we want to use to make rebase remove these commits is `--onto <rev>`.
This tells rebase to start the operation from that revision. From that revision
it will apply all the commits that comes between the other revision we specify,
and the current commit.

The revision we want to specify for onto is master, since the branch is based
off of master. If it was based off of an older commit from master, this rebase
would make the newer commits included in this branch. To avoid this you can
instead specify the last commit in the branch that was from master, i.e. the
commit after the last commit you want to remove. This commit can be found with
the command `git merge-base master HEAD`. For this exercise, we will just use
master though.

In addition to that revision, you also need to specify a revision for which
commits you want to include in the rebase. Like in the previous task, the
commits which will be included is the ones that comes between this revision and
the current commit. Since we only want to include the last commit, we can
specify `HEAD~` like we did for the reset command. So we end up with:

```
git rebase --onto master HEAD~
```

Since this is not an interactive rebase, no editor will open up. The operation
will run, and you end up with a branch containing only the last commit.

Of course, it's also possible to move multiple commits to another branch by
specifying a different revision to reset and rebase. You can also move other
commits than the last, but to do that you might need to run an interactive
rebase to reorder the commits first, or do it in a completely different way.
This is left as a bonus exercise, and will not be explored further here.

## Part 5. Merge into master and resolve conflicts

The operations we've covered so far in this exercise are the ones you'll most
commonly use to keep your branch history nice and clean. Now that we've cleaned
up the branch a bit, the final thing we'll do with it is to merge it back in to
the master branch.

To do this, switch back to the master branch by running `git checkout master`
and then perform the merge by running `git merge feat/trigonometric-functions`.

When you perform merges, it's normal to encounter conflicts caused by changes
introduced (usually by other people) on the branch you're merging into. If git
can't figure out how to cleanly combine the changes, you'll have to do it
yourself. In this case, there will be a few small conflicts you'll have to solve
manually, both in calc.js and in index.html.

If you open exercise-2/calc.js, you'll see that git has inserted some markers
for you:
```
<<<<<<< HEAD
    case 'minus':
      return number1 - number2;
=======
    case 'sin':
      return Math.sin(number1);
>>>>>>> feat/trigonometric-functions
```

This indicates the conflicting sections from the master and the feature branch,
respectively. Since we in this case want both changes to be there, the correct
strategy is simply to remove the conflict markers so all three switch cases
remain. There should be one more similar conflict to solve, in index.html.

After you've solved all the conflicts, use `git add` to add the conflicting
files (calc.js and index.html) to the staging area to include them in the merge
commit. Finish the merge by running `git commit`.

## Bonus task 1. Verify commits in a rebase with --exec

When doing a rebase you often change the contents of previous commits. If you
don't take care, you might end up with commits that don't run properly. Because
you might want to go back to the commit at a later time (e.g. if you run bisect,
or do a revert), you want all of the commits to run properly.

To verify that they do that, you can use the `--exec <command>` option of
rebase. This will run the command you specify for each commit you rebase over,
and check the return code of the command. If the command fails, it will stop the
rebase at that commit, and allow you to fix the error and continue.

The command you would run could be a command for compiling the code or running
the tests for the project. We don't have any tests in this example, but you
could try running [prettier], which is a tool for formatting code. The `-l`
option makes prettier check if the code is formatted correctly. Try it by
running:

```
npm install prettier
git rebase --exec 'prettier -l --single-quote exercise-2/calc.js' HEAD~3
```

Try to introduce an error in an earlier commit, or run prettier without the
`--single-quote` option to see what happens when the check fails.

[prettier]: https://prettier.io/

## Bonus task 2. Save and reuse conflict resolution with rerere

Sometimes you might end up resolving the same conflict multiple times. This
happens because git by default doesn't store how you resolve conflicts any place
apart from the merge commit itself. The reason you might have to resolve the
conflict again is if you remove the merge commit and do the merge again (e.g. if
you realized you wanted to change something in the branch before you merge it,
or you just wanted to test merging it before you were finished with it) or if
you run an interactive rebase with the preserve-merges option.

However, git has a way to store these conflict resolutions which is called
rerere, or reuse recorded resolution. To enable this, set the config variable
`rerere.enabled` to `true`.

```
git config --global rerere.enabled true
```

For future merges, git will now store this information. If the same conflict
occurs, it will automatically apply the resolution. The file will still be
marked as having a conflict though, so you have a chance to check that the
resolution is still correct. If the resolution is incorrect, and you want the
conflict markers, you can run the command `git checkout -m <file>`.

Note that this information is stored separately from the merge commit, which
means that you will only have this information for commits you yourself has done
after you enabled rerere. To include previous merges or merges done by others,
you can run a script called `rerere-train.sh`. This usually comes included with
git, but is probably not in your PATH so you will have to locate it, or download
it e.g. [from github][rerere-train-github].

This script takes a revision and looks at all the commits reachable from that
revision. We will specify `HEAD`, which means that it will go through all the
commits in the current branch. You can specify any options that are valid for
the `rev-list` command for this script.

Try running `rerere-train.sh` on the merge commit you created in part 5. Then
remove this merge commit and do the merge again.

```
rerere-train.sh HEAD
git reset --keep HEAD~
git merge feat/trigonometric-functions
```

[rerere-train-github]: https://raw.githubusercontent.com/git/git/master/contrib/rerere-train.sh
