# mychat

# createGroupStep2
i use createGroupStep2 for add member to group because they use same functionality and same style but there is some difrence between them : in create group we add userId to memberIds array when load createGroupStep2 file but for add members we don't need do that & in create group we can select multiple conatact but in add member to group we add just one member to group at one try so i add one if that check if memberIds array length is over than one member and we select another member the prev member remove from array

# rightClick
position relative broke style of right click sooo if right click in not in right position it is 90% because there is element that has position relative 
becase rightClick should positioned base on main html


# load chat when chat dosen't exist
if found chat => getChat
if not found chat => getContact and save it in userContact and use it for show information 
then when send first message and chat create push to chat/chatId and reGet all chats => (rightSideMainPage reload because chatId in url and chatList change)

# send media permition
need some repair later becase for send file i have just one button and if photo is not allowed i just remove the button and then music and other files is become not allowed and this is not currect sooooooo it should be repair : click on button -> open a window contain file btn photo btn music btn and ...