package com.sh.stackrhub.config

import com.sh.stackrhub.api.utils.jwt.JwtRequestFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter


@Configuration
@EnableWebSecurity
class SecurityConfig(
	private val userDetailsService: UserDetailsService,
	private val jwtRequestFilter: JwtRequestFilter
) : WebSecurityConfigurerAdapter() {

	@Bean
	@Throws(Exception::class)
	override fun authenticationManagerBean(): AuthenticationManager {
		return super.authenticationManagerBean()
	}

	@Throws(Exception::class)
	override fun configure(authenticationManagerBuilder: AuthenticationManagerBuilder) {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder())
	}

	@Throws(Exception::class)
	override fun configure(http: HttpSecurity) {
		http.csrf().disable()
			.authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow preflight requests for all endpoints
			.antMatchers("/api/auth/login", "/api/auth/register").permitAll() // Allow access to login and register endpoints without authentication
			.anyRequest().authenticated()
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter::class.java)
	}

	@Bean
	fun passwordEncoder(): PasswordEncoder {
		return BCryptPasswordEncoder()
	}

}
