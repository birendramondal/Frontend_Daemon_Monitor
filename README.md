In the front end of the daemon monitoring tool, we can increase and decrease the instances as per requirement. 
1. **First, install the node module.**
2. ### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

3. It will start looking for the python API **"http://127.0.0.1:5000/api/show"**

4. **API response :**
   
   {
  "1": {
    "daemon_id": "1", 
    "daemon_name": "uploader", 
    "daemon_status": "DOWN", 
    "instance": 1
  }, 
  "2": {
    "daemon_id": "2", 
    "daemon_name": "downloader", 
    "daemon_status": "UP", 
    "instance": 1
  }, 
  "3": {
    "daemon_id": "3", 
    "daemon_name": "filetransfer", 
    "daemon_status": "UP", 
    "instance": 1
  }, 
  "4": {
    "daemon_id": "4", 
    "daemon_name": "filetransfer", 
    "daemon_status": "UP", 
    "instance": 1
  }
}


5. We can filter-out the daemons using names. 
