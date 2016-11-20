#!/usr/bin/env bash
rsync -avz ./frontend root@haomo-studio.com:/var/www/html/pt/energy/
rsync -avz ./bower_components root@haomo-studio.com:/var/www/html/pt/energy/
