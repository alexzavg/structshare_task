- [PLEASE WATCH THIS VIDEO BEFORE SETUP](#please-watch-this-video-before-setup)
- [Test run examples](#test-run-examples)
- [Setup](#setup)

# PLEASE WATCH THIS VIDEO BEFORE SETUP 
- [https://youtu.be/pPgWeIKjBBM](https://youtu.be/pPgWeIKjBBM)

# Test run examples
1. Valid sign in: [https://youtu.be/dIj8_iqZnHY](https://youtu.be/dIj8_iqZnHY)
2. Invalid sign in: [https://youtu.be/hwOzUPjvG24](https://youtu.be/hwOzUPjvG24)
3. Guest user checkout process: [https://youtu.be/poXWTqLstXo](https://youtu.be/poXWTqLstXo)

# Setup
1. Install [nodejs & npm](https://nodejs.org/en/) 
2. Clone this repo
3. Run these commands in the project root folder:
   1. `npm i`
   2. `npm i -g ts-node`
   3. `npx playwright install --with-deps`
   *if you encounter an `EACCESS` error - try the same command with `sudo` at the beginning
4. In the root dir create a file named `.env.prod` and paste the following contents in it:
   ```
   ENV_NAME="PROD"
   BASE_URL="https://www.etsy.com"
   USER_LOGIN="me41zavgorodnii@gmail.com"
   USER_PASSWORD="QWErty1234_"
   ```
   - These are environmental variables needed for the tests to run.
5. Run tests `npm run e2e_tests_prod`
6. If you want to view the HTML report locally:
   - go to `e2e.playwright.config.ts`
   - change the `startServer` value to `true` on line 19
   - run the testsreport will automatically open after tests finish
   - or view this video with explanation: [https://youtu.be/7HOY1WEBV1o](https://youtu.be/7HOY1WEBV1o)
7. Tests also run in CI on commit to `main` branch and an HTML report is published at https://alexzavg.github.io/structshare_task/e2e_tests_prod
