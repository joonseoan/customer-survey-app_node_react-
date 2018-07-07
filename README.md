# Customer Survey App by React, Node, and MongoDB

## Front : React (reduxThunk, reduxForm, and stripe)
## Back : Node (express, mongoose, passport, google-oauth, sendgrid, and stripe )

## App Structure :
#### Login and Logout
#### Payments for Email Survey
#### Email Build and Customer Data Record  
#### Main Page
##### ![Main Page1](googleAuthLogout.PNG)

#### 1. Google Oauth
####      - logging in and out the application through 3rd party accounts which is Google at this app
####      - serializing and deserializing user login data 
####      - and utilizing passport, cookie-session, and mongoose
##### ![Login Page1](googleAuthLogin.PNG)
##### ![Login Page2](googleAuthLogin2.PNG)

#### 2. Stripe Payments
####      - routing the user to get his/sher credit authorized from the sengrid server
####      - importing react-stripe-checkout module in frontend (react)
####      - and implementing mongoose to store user's credit information
##### ![Payment Page1](payment_window.PNG)
##### ![Payment Page2](credit.PNG)

#### 3. Sendgrid Email
####      - providing a form (at front) where the user builds and sends the email survey to their customers
####      - implementing the route handlers coworking with sendgrid library to send user's survey emails to their customers 
####      - storing email data and customer feedbacks in the database for the user to collect the customer data
####      - and implementing mongoose, express, sendgrid module
##### [Email Form]
##### ![email_form1](emailForm.PNG)
##### [Survey List]
##### ![email_form2](surveyList.PNG)
##### [Email Arrival]
##### ![email_form3](emailList.PNG)
##### [Email Content]
##### ![email_form4](emailContent.PNG)
##### [Survey Feedback]
######  (When the customer clicks "Yes" in the email contents)
##### ![email_form5](surveyFeedback.PNG)








