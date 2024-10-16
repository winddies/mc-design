FROM artifactory.ab-inbev.cn/budtech-docker/nginx:latest
COPY apps/low-code-editor/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
