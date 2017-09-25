# RFIDPartsLog
Google Script to manage a parts log

# Flow

 - Employee swipes card
   - Check employee is valid
   - Bring up employee info
 - Ask what to do
   - Log in
   - Log out
   - Customer request

If customer request:
 - Customer swipes card
   - Checks if customer card id is in database

    If customer card id is in database:
     - Bring up info about customer

    If customer card id is not in database:
     - Ask for customer email / banner id to lookup in database
     - Associate card id with customer in database
     - Bring up info about customer

 - Ask what customer wants
   - Parts request
   - Equipment load
   - Equipment return
  
  If parts request:
 - Get parts
 - Select what parts are being given (On page / barcode sheet / etc)
 - Finish transaction

  If equipment load:
 - Get equipment
 - Scan barcode / RFID on equipment
 - Finish transaction

  If equipment return:
 - Scan barcode / RFID on equipment
 - Finish transaction

If log in:
 - Log (Sling integration?)
 - Finish transaction

If log out:
 - Log (Sling integration?)
 - Finish transaction
