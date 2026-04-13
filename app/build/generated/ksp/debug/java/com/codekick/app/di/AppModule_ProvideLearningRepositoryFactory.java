package com.codekick.app.di;

import com.codekick.app.data.repository.LearningRepository;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.Preconditions;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;

@ScopeMetadata("javax.inject.Singleton")
@QualifierMetadata
@DaggerGenerated
@Generated(
    value = "dagger.internal.codegen.ComponentProcessor",
    comments = "https://dagger.dev"
)
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava",
    "cast",
    "deprecation",
    "nullness:initialization.field.uninitialized"
})
public final class AppModule_ProvideLearningRepositoryFactory implements Factory<LearningRepository> {
  @Override
  public LearningRepository get() {
    return provideLearningRepository();
  }

  public static AppModule_ProvideLearningRepositoryFactory create() {
    return InstanceHolder.INSTANCE;
  }

  public static LearningRepository provideLearningRepository() {
    return Preconditions.checkNotNullFromProvides(AppModule.INSTANCE.provideLearningRepository());
  }

  private static final class InstanceHolder {
    static final AppModule_ProvideLearningRepositoryFactory INSTANCE = new AppModule_ProvideLearningRepositoryFactory();
  }
}
