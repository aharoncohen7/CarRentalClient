This is an interface project for managing a car rental business, which refers to 3 categories - vehicles, customers, and bookings/rental transactions.
The project mostly acts as a management interface with 'admin' permission, that is, it includes the possibility to view, update and delete all orders, vehicles and customers.
In addition, in the 'dashboard' path you can see all the basic data arranged in a table with the possibility of searching and sorting and filtering values, the dashboard is built in a completely generic way and it can adapt itself to several information formats.
In these tables, the idea of ​​PAGEINTAION is realized, that is, the information arrives in small portions according to the capacity of the current page, with the aim of reducing the network traffic.
In addition, there is a new customer registration form. There is also a car rental order form, the form appears in a pop-up window when you click the order button, if the car is free and available.
Next to each order, customer and vehicle will have buttons whose function is to update the information.


Instructions:
To run the project, copy it, navigate to the folder, run "npm i" to install the modules, then "npm run dev".
The project cannot work without setting up the server, which must be copied from the address
https://github.com/aharoncohen7/CarRentalServer
and follow the instructions in the file that exists there.

pagination


זהו פרוייקט ממשק לניהול עסק להשכרת רכב, המתייחס ל3 קטגוריות - רכבים, לקוחות, והזמנות/עסקאות השכרה.
הפרוייקט ברובו מתנהג כממשק ניהול של הרשאת 'אדמין', כלומר, הוא כולל אפשרות צפייה עדכון ומחיקת של כלל ההזמנות, הרכבים והלקוחות.
בנוסף, בנתיב 'dashboard' ניתן לראות את כל הנתונים הבסיסיים מסודרים בטבלה עם אפשרות חיפוש ומיון וסינון ערכים, הטבהל בנויה בצורה גנרית לחלוטין והיא יכולה להתאים את עצמה לכמה תבנית מידע.
בטבלאות אלו ממומש רעיון הPAGEINTAION , כלומר, המידע מגיע במנות קטנות בהתאם לקיבולת העמוד הנוכחי, זאת במטרה להקטין את תעבורת הרשת.
בנוסף, ישנו טופס רישום לקוח חדש. כמו"כ יש טופס הזמנת השכרת רכב, הטופס מופיע בחלון קופץ בעת לחיצה על לחצן ההזמנות, זאת במידה והרכב פנוי וזמין.
ליד כל הזמנה, לקוח ורכב ישנפ כפתורים שתפקידם לעדכן את המידע.


הוראות:
כדי להפעיל את הפרוייקט, יש להעתיק אותו, לנווט לתיקייה, להריץ "npm i" על מנת להתקין את המודולים, ואז "npm run dev".
הפרוייקט לא יכול לעבוד ללא הקמת השרת, אותו יש להעתיק מהכתובת 
https://github.com/aharoncohen7/CarRentalServer
ולפעול על פי ההוראות בקובץ שקיים שם.

