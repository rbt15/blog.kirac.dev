---
title: Declarative Http Clients using Spring WebClient & Kotlin
author: Kıraç Acar Apaydın
pubDatetime: 2024-01-04T21:15:33.495Z
featured: false
draft: false
tags:
  - Kotlin
  - Spring
  - WebClient
description: "Learn how to create declarative HTTP clients using Spring WebClient and Kotlin."
slug: declarative-http-clients-using-spring-webclient-and-kotlin
---

## Table of Contents

In modern web development, making HTTP requests and consuming APIs is a common task. In this blog post, we will explore how to create declarative HTTP clients using Spring WebClient and Kotlin.

## What is a Declarative HTTP Client?

A declarative HTTP client is an interface that defines the HTTP endpoints of a service. It is a contract between the client and the server. The client can consume the endpoints defined in the interface without worrying about the underlying implementation. This approach is beneficial because it allows you to focus on the business logic of your application rather than the details of how it communicates with other services.

## Why use Spring WebClient?

Spring WebClient is a reactive HTTP client that is part of the Spring Framework. It is a non-blocking, asynchronous client that supports reactive streams. It is a great choice for building declarative HTTP clients because it is easy to use and integrates well with Kotlin.

## The Implementation

The only dependency we need to use Spring WebClient is `spring-webflux`. We can add this dependency to our `build.gradle.kts` file as follows:

```kotlin
implementation("org.springframework.boot:spring-boot-starter-webflux")
```

Let's take a look at how to implement a declarative HTTP client using Spring WebClient and Kotlin.

```kotlin
interface PostClient {
    @GetExchange("/posts")
    suspend fun getPosts(): List<Post>

    @GetExchange("/posts/{id}")
    suspend fun getPostById(@PathVariable id: Int): Post

    @PostExchange("/posts")
    suspend fun createPost(@RequestBody post: Post): Post
}
```

Here, we have defined a `PostClient` interface that defines the HTTP endpoints of a service. By annotating the interface with `@GetExchange` and `@PostExchange`, we can define the HTTP method and path of each endpoint. The `@PathVariable` and `@RequestBody` annotations allow us to define the parameters of each endpoint.

## Consuming the Client

Now, let's consume these endpoints in a service class, `PostService`, which encapsulates the business logic.

```kotlin
@Service
class PostService(private val postClient: PostClient) {

    suspend fun getPosts(): List<Post> {
        return postClient.getPosts()
    }
}
```

Here, we have injected our `PostClient` into the `PostService` class. We can now call all the endpoints defined in the `PostClient` interface.

## Configuring the WebClient

Up to this point, we have defined our declarative HTTP client but have not configured the underlying WebClient. Unfortunately, unlike the Feign client, Spring WebClient does not provide a way to configure the client automatically. However, we can configure the WebClient manually. By the way, there is an [open issue](https://github.com/spring-projects/spring-boot/issues/31337) to add this feature to declarative HTTP clients in Spring Boot.

To configure our WebClient, we create a `PostClientConfiguration` class annotated with `@Configuration`. This class initializes our `PostClient` with a base URL and other necessary configurations.

```kotlin
@Configuration
class PostClientConfiguration {

    @Bean
    fun postClient(): PostClient {
        val webClient = WebClient.builder()
            .baseUrl("https://jsonplaceholder.typicode.com")
            .build()

        return HttpServiceProxyFactory.builderFor(WebClientAdapter.create(webClient))
            .build()
            .createClient(PostClient::class.java)
    }
}
```

This configuration sets up the WebClient with a base URL and uses `HttpServiceProxyFactory` to create a proxy for our `PostClient` interface. This may seem like a lot of boilerplate code, but it would be much more if we were using the WebClient directly.

## Error Handling

Handling errors is an important part of any HTTP client. In this section, we will look at how to handle errors in our declarative HTTP client.

```kotlin
val webClient = WebClient.builder()
    .baseUrl("https://jsonplaceholder.typicode.com")
    .defaultStatusHandler(HttpStatusCode::isError) { _ -> throw PostClientException() }
    .build()
```

Here, we have configured our WebClient to throw a `PostClientException` whenever it receives an error response. This allows us to handle errors in a centralized location rather than in each endpoint.

## Conclusion

In this post, we've delved into the world of declarative HTTP clients using Spring WebClient and Kotlin. We've seen how to define an interface that defines the HTTP endpoints of a service and how to consume those endpoints in a service class. We've also seen how to configure the underlying WebClient and how to handle errors in our declarative HTTP client. I hope you found this post useful and that it helps you build better applications with Spring WebClient and Kotlin.

Thanks for reading!

## References

- [Spring WebClient](https://docs.spring.io/spring-framework/reference/web/webflux-webclient.html)
- [Spring WebClient Kotlin Extensions](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#webflux-client-kotlin-extensions)
