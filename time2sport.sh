#!/bin/bash

#**************************************************************************
# Use in the rocket chat of MARCOPOLO project.
# During the confinement, it's good to stay in good health.
# This script send message to do exercices on the rocketchat channel.
#
# motivation message:               . ./time2sport.sh motivation
# training first session message:   . ./time2sport.sh training 1
# training second session message:  . ./time2sport.sh training 2
# training last session message:    . ./time2sport.sh training 4
# testing script:                   . ./time2sport.sh test training 4
#
# cron job:
# ($ crontab -e  -> add on the document -> 1 2 3 4 5 /path/to/command arg1 arg2)
# 9:00 - https://crontab.guru/#0_9_*_*_1-5      ./time2sport.sh motivation
# 9:15 - https://crontab.guru/#15_9_*_*_1-5     ./time2sport.sh training 1
# 11:15 - https://crontab.guru/#15_11_*_*_1-5   ./time2sport.sh training 2
# 14:15 - https://crontab.guru/#15_14_*_*_1-5   ./time2sport.sh training 3
# 16:15 - https://crontab.guru/#15_16_*_*_1-5   ./time2sport.sh training 4
#
# update: 15.05.2020
#**************************************************************************

###########
# ROCKET CHAT PARAMETER
###########
local ROCKETCHAT_CHANNEL='#notdev.time2sport'
local ROCKETCHAT_ALIAS='PADAWAN_BOT'

if [[ ! -v ROCKETCHAT_TOKEN ]]; then
    echo "ROCKETCHAT_TOKEN is not set"
    return
fi

if [[ ! -v ROCKETCHAT_USERID ]]; then
    echo "ROCKETCHAT_USERID is not set"
    return
fi

###########
# VERIFY ARGS
###########
local TYPE_MESSAGE=''
local SESSION='first'
local DEBUG=''
local i 

# @dev check args contain specific string
for i in "$@" ; do
    if [[ $i == "test" ]] ; then
        ROCKETCHAT_CHANNEL='#notdev.time2script'
    elif [[ $i == "debug" ]] ; then
        DEBUG='debug'
    elif [[ $i == "training" ]] ; then
        TYPE_MESSAGE='training'
    elif [[ $i == "motivation" ]] ; then
        TYPE_MESSAGE='motivation'
    elif [[ $i == "1" ]] ; then
        SESSION='first'
    elif [[ $i == "2" ]] ; then
        SESSION='second'
    elif [[ $i == "3" ]] ; then
        SESSION='third'
    elif [[ $i == "4" ]] ; then
        SESSION='final'                
    fi
done

if [[ $DEBUG == "debug" ]] ; then
    echo 'DEBUG mode' 
elif [[ $TYPE_MESSAGE == "" ]] ; then
    echo 'MISSING ARG (motivation or training)' 
    echo ' - time2sport [test] [motivation] [training [1|2|3|4]]'
    echo ' - ie: time2sport motivation'
    echo ' - ie: time2sport training 1'
    return
fi

###########
# IMAGE URL
###########
local HOMER='https://seeklogo.com/images/H/homer-simpson-holding-beer-duff-logo-9172512EF9-seeklogo.com.png'
local MONDAY='https://imagenes.iberoeconomia.es/wp-content/uploads/2019/08/01132015/Anllela-Sagra-Entrenamiento-680x415.jpg'
local TUESDAY='https://scontent.fzrh3-1.fna.fbcdn.net/v/t1.0-9/67209405_1755104351258960_8649192620855132160_n.jpg?_nc_cat=111&_nc_sid=8024bb&_nc_oc=AQmdoPeQxpLFJF965i_SkuSbpNgKRPf_qdsL6xlf7Vo6hSHEci4qRgcBlyVODobQbsk&_nc_ht=scontent.fzrh3-1.fna&oh=4f1b39499e9467ed5985261007abab13&oe=5EBDCE4A'
local WEDNESDAY='https://4.bp.blogspot.com/-ERvQB3-ZA7g/ULpXgcepaII/AAAAAAAAAGk/6eryjv4OsOU/s1600/603585_421143197950736_1609725200_n.jpg'
local THURSDAY='http://2.bp.blogspot.com/-qnO7_78pnG4/VEMs6slyeYI/AAAAAAAAObs/MjtyAMeH6jg/s1600/ddddd.jpg'
local FRIDAY='https://suburbanmen.com/wp-content/uploads/2020/03/instagram-crush-meredith-mack-20200302-1006.jpg'

# !! using sh and bash:array start with 0, using zsh:array start with 1 !!
local image_url=($HOMER $MONDAY $TUESDAY $WEDNESDAY $THURSDAY $FRIDAY $HOMER)
local day=('SUNDAY' 'MONDAY' 'TUESDAY' 'WEDNESDAY' 'THURSDAY' 'FRIDAY' 'SATUDAY')
local DOW=$(date +%u)
echo "$(date) -- ${day[$DOW]:0} ${TYPE_MESSAGE} ${SESSION} -- ${ROCKETCHAT_CHANNEL}"

###########
# SEND MESSAGE MOTIVATION
###########
if [[ $TYPE_MESSAGE == "motivation" ]] ; then
   curl --silent \
         -H "X-Auth-Token: ${ROCKETCHAT_TOKEN}" \
         -H "X-User-Id: ${ROCKETCHAT_USERID}" \
         -H "Content-type:application/json" \
         https://rocketchat-marco-polo.openshift.elca-services.com/api/v1/chat.postMessage \
         -d '{
      "alias": "'${ROCKETCHAT_ALIAS}'",
      "avatar": "'${image_url[$DOW]}'",
      "channel": "'${ROCKETCHAT_CHANNEL}'",
      "attachments": [{
         "image_url": "'${image_url[$DOW]}'",
         "title": "Time to '${day[$DOW]}' Training!",
         "text": "9:15 - 11:15 - 14:15 - 16:15"
      }]}'
    echo '' # return line for the log
    echo '' # return line for the log
fi

###########
# SEND MESSAGE TRAINING
###########

if [[ $TYPE_MESSAGE == "training" ]] ; then
    # TRAINING MESSAGE
    nb='10'
    if [[ -z "${HOME}" ]]; then
        nb=$(( $nb + 10 )) 
    fi

    message="@all let s go with the ${SESSION} round: \n"
    noob="[noob :space_invader:] 10 push-up + 10 crunch abs \n"
    easy="[geek :robot:] $(( $nb )) push-up + $(( $nb )) crunch abs + $(( $nb )) plank \n"
    medium="[saiyen :muscle:] $(( $nb + 5 )) push-up + $(( $nb + 5 )) crunch ab + $(( $nb + 5 )) plank \n"
    difficult="[super saiyen :punch:] $(( $nb + 10 )) push-up + $(( $nb + 10 )) crunch abs + $(( $nb + 10 )) plank + $(( $nb + 10 )) chair dips \n"
    challenge="[SS2 :hot_face:] $(( $nb + 10 )) push-up + $(( $nb + 10 )) crunch abs + $(( $nb + 10 )) plank + $(( $nb + 10 )) chair dips + $(( $nb + 90 )) jumping rope"
    # echo ${message}${noob}${easy}${medium}${difficult}${challenge}

    curl -H "X-Auth-Token: ${ROCKETCHAT_TOKEN}" \
            -H "X-User-Id: ${ROCKETCHAT_USERID}" \
            -H "Content-type:application/json" \
            https://rocketchat-marco-polo.openshift.elca-services.com/api/v1/chat.postMessage \
            -d '{
        "alias": "'${ROCKETCHAT_ALIAS}'",
        "avatar": "'${image_url[$DOW]}'",
        "channel": "'${ROCKETCHAT_CHANNEL}'",
        "text": "'"${message}${noob}${easy}${medium}${difficult}${challenge}"'" 
        }'
    echo '' # return line for the log
    echo '' # return line for the log
fi