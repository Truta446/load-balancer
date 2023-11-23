
# Load Balancer

![App Screenshot](https://png.pngtree.com/thumb_back/fh260/background/20220118/pngtree-load-balance-and-high-availability-load-balance-script-technology-photo-image_7948806.jpg)

I implemented a load balancer in javascript so that calls do not overload any of the servers. For this I used the Round Robin algorithm for load balancing.

## Important commands

To install dependencies:

```bash
  npm install
```

To start alpha server:

```bash
  npm run start:server:alpha
```

To start beta server:

```bash
  npm run start:server:beta
```
    
To start beta server:

```bash
  npm run start:lb
```

To make some calls:

```bash
  curl -k https://localhost/app
```
## Licença

[MIT](https://choosealicense.com/licenses/mit/)


## Autores

- [@truta446](https://www.github.com/truta446)

