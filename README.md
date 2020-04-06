# VonageMessageDispatchCertificateProject

Hi Mark,

Here is my second project.

To install this project, please perform the following steps:

Clone or download the project (e.g. git clone https://github.com/max-schmidt92/VonageMessageDispatchCertificateProject.git)
Open command prompt (or equivalent), change directory to the project's directory and type in "npm install". This will install all NodeJS packages necessary to run the project.

Change API key, API Secret, application ID and utilise your own projects private.key (put it directly in the same folder)

From the command prompt, type in "ngrok http 3000" or any port you like (if you use another port, change the variable in the Javascript file).

Enter your Nexmo dashboard, associate (preferably a US) phone number to your project. Enter the ngrok url as shown in the red box below, and use the same /webhooks/inbound-message part of the URL:
![Replicate as shown.](http://puu.sh/FtUvY/8392b97a55.png)

Run or debug the project.

The only caveat with present MMS functionality is that it is only possible to send MMS messages to a US phone number.

Finally, if you have any questions about the project, feel free to contact me at max.topsholm@artificial-solutions.com.

Best regards,

Max Topsholm
