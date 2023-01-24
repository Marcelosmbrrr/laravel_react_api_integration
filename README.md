# Laravel as Api + React
<p>This repository contains simple software developed using the Laravel framework to create a RESTful API and the React framework with MaterialUI to build the user interface. Was done to explore the integration of both with separated folders. Futhermore, this app have additional resources, like authentication with Sanctum token and a real time chat made with Pusher.</p>

<p><b>For VueJS, Angular or any other framework of javascript the general implementation will be exactly the same</b>: an frontend folder, with the layout for the client, and the backend with Laravel that is prepared, for default, to deal with CORS (cross origin domain) and have packages to generate auth tokens, like sanctum.</p>

<p>The development of real time chat also will be the same using Pusher. In the frontend, with any framework, and Laravel as the backend Pusher will be downloaded (on both sides) and configured (using env variables and the necessary functions) based on the channel created in the plataform. The named channel, that needs to be created in our Pusher account, acts like a bridge to distribute the data for all connected clients.</p>

<p>Being short, the real time chat works like that: the frontend have a special event listener that is configured with pusher method "bing" and with a name, like "message", for example, and a form to type the message and send to server side; in the server side exists a route to proccess the request and send the data to Pusher channel with a special method named "trigger" that need to receive the Pusher channel name, the client side event listener name and the data. So, the Pusher channel receives the data and throws it to all the clientes connected to the channel and specifically to the their event listener.</p>

<p>So, Pusher is the "broadcast agent" because it receives the data from server side, that comes originally from client side, and spread it to all clients connected to the created channel.</p>
