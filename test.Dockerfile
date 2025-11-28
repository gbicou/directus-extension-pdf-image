FROM directus/directus:11.13.4 AS directus

# reinstall build tools with canvas dependencies

USER root
RUN apk --no-cache add python3 py3-setuptools build-base \
    pixman-dev \
    cairo-dev \
    pango-dev

# copy extension into directus extensions

USER node
WORKDIR /directus/extensions/pdf-image
COPY . .

# build extension in directus image environment

RUN pnpm install --frozen-lockfile
RUN pnpm build

# back to directus

WORKDIR /directus
