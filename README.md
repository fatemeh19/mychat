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

# profilePic in client
src={ 
    userContact.profilePic
        ? `/uploads/photo/${profilePicName[profilePicName.length - 1]}`
        : '/uploads/photo/defaultProfilePic.png'
}
we need this structure for profilePic if we have multiple image for profile picture but now we hove one so just use src={ `${profilePicNameHandler(Contact)}` }

# optional object arguments
const data = {
    name: groupName, <!--> this is fixed argument <-->
    ...(values.description && { description: values.description }) <!--> this is optional argument : ...(conditional && {a sub object that if condition is true it is added to the main object} ) <-->
}

# useEffect : return
in editUserProfile i want to save the change after close the popUp and for that i use return in useEffect but in return i don't have access to current state but the previus state for solve this problem i put the dependencies state in dependencies in useEffect and with this after close popup i can access to current state but here there is another problem that after every change in state return run ---- this problem not solve and stil exist : with this problem now work like this : after every change in profile Info like name or username of phone number this change go to server like telegram but i didn't want this.
(---think or search to solve this problem later----)