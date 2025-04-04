FROM alpine:latest

ARG PB_VERSION=0.26.6

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# copy the local pb_migrations dir into the image
COPY ./booking/db/pb_migrations /pb/pb_migrations

# uncomment to seed with local data !! DO THIS ONLY ONCE !!
# COPY ./db/pb_data /pb/pb_data

# copy the local pb_hooks dir into the image
COPY ./booking/db/pb_hooks /pb/pb_hooks

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]