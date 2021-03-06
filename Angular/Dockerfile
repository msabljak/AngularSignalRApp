#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
EXPOSE 4200

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Angular/Angular.csproj", "Angular/"]
COPY ["SignalRChat/SignalRChat.csproj", "SignalRChat/"]
RUN dotnet restore "Angular/Angular.csproj"
COPY . .
WORKDIR "/src/Angular"
RUN dotnet build "Angular.csproj" -c Release -o /app/build

FROM build AS publish
## Add nodejs to container
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install nodejs
## Finish adding nodejs to container
RUN dotnet publish "Angular.csproj" -c Release -o /app/publish

#Angular build
FROM node as nodebuilder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH


# install and cache app dependencies
COPY Angular/ClientApp/package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.0 --unsafe

# add app

COPY Angular/ClientApp/. /usr/src/app

RUN npm run build

#End Angular build

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
#Angular start
RUN mkdir -p /app/ClientApp/dist
COPY --from=nodebuilder /usr/src/app/dist/. /app/ClientApp/dist/
#Angular end
ENTRYPOINT ["dotnet", "Angular.dll"]