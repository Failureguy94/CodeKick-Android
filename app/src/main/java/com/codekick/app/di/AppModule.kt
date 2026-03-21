package com.codekick.app.di

import com.codekick.app.data.repository.AuthRepository
import com.codekick.app.data.repository.LearningRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideAuthRepository(): AuthRepository = AuthRepository()

    @Provides
    @Singleton
    fun provideLearningRepository(): LearningRepository = LearningRepository()
}
