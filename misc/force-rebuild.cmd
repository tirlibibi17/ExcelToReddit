@rem creates and pushes an empty commit to force page rebuild

git commit -m "rebuild pages" --allow-empty
git push origin master