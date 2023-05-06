#!/bin/sh

# Author : Brock Herion

file_name=''

while getopts n: flag 
do
	case $flag in
		n) file_name="$OPTARG" ;;
    *) exit 1 ;;
	esac
done

echo "Processing image $file_name"
echo "==========================="

cwebp ~/Downloads/$file_name.png -o ./public/posts/$file_name.webp

echo "==========================="
echo "Done"
