package com.sh.stackrhub.api.utils

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtil {

	@Value("\${jwt.secret}")
	private lateinit var secretKey: String

	fun extractUsername(token: String): String {
		return extractClaim(token, Claims::getSubject)
	}

	fun extractExpiration(token: String): Date {
		return extractClaim(token, Claims::getExpiration)
	}

	fun <T> extractClaim(token: String, claimsResolver: (Claims) -> T): T {
		val claims = extractAllClaims(token)
		return claimsResolver.invoke(claims)
	}

	private fun extractAllClaims(token: String): Claims {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).body
	}

	private fun isTokenExpired(token: String): Boolean {
		return extractExpiration(token).before(Date())
	}

	fun generateToken(userDetails: UserDetails): String {
		val claims: Map<String, Any> = HashMap()
		return createToken(claims, userDetails.username)
	}

	private fun createToken(claims: Map<String, Any>, subject: String): String {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(Date(System.currentTimeMillis()))
			.setExpiration(Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
			.signWith(SignatureAlgorithm.HS256, secretKey).compact()
	}

	fun validateToken(token: String, userDetails: UserDetails): Boolean {
		val username = extractUsername(token)
		return (username == userDetails.username && !isTokenExpired(token))
	}
}
