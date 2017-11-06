# syncToCoderpad
### "You don't realize what you are missing until you get a live updated right panel" - Jerry
## Description
These scripts will synchronize the video playback on the Karat interview page with coderpad playback. This allows the interviewer performing QC to see the execution output in sync with the video.

## Notes
The default is for sync to be enabled. If you open up another tab to review results, be sure to disable sync on the second tab to avoid blinking on the CoderPad tab.

## Instructions
1. Install Tampermonkey
2. Install both UserScripts
3. Identify your Karat UserID by finding it in the URL of your profile page.
4. Define your UserID in the syncFromVideo.user.js script by editing it in the Tampermonkey Dashboard / Editor
5. QC in style
