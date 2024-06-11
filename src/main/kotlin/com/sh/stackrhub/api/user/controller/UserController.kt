package com.sh.stackrhub.api.user.controller

import com.sh.stackrhub.api.user.model.dto.UserDto
import com.sh.stackrhub.api.user.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UserController(private val userService: UserService) {

	@GetMapping
	fun getAllUsers(): ResponseEntity<List<UserDto>> = ResponseEntity.ok(userService.getAllUsers())

	@GetMapping("/{id}")
	fun getUserById(@PathVariable id: Long): ResponseEntity<UserDto> =
		userService.getUserById(id)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()

	@PostMapping
	fun createUser(@RequestBody userDTO: UserDto): ResponseEntity<UserDto> =
		ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDTO))

	@PutMapping("/{id}")
	fun updateUser(@PathVariable id: Long, @RequestBody userDTO: UserDto): ResponseEntity<UserDto> =
		ResponseEntity.ok(userService.updateUser(id, userDTO))

	@DeleteMapping("/{id}")
	fun deleteUser(@PathVariable id: Long): ResponseEntity<Void> {
		userService.deleteUser(id)
		return ResponseEntity.noContent().build()
	}
}
