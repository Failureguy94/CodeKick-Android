package com.codekick.app.ui.screens.learn;

import com.codekick.app.data.repository.LearningRepository;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.Provider;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;

@ScopeMetadata
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
public final class LearnViewModel_Factory implements Factory<LearnViewModel> {
  private final Provider<LearningRepository> learningRepositoryProvider;

  public LearnViewModel_Factory(Provider<LearningRepository> learningRepositoryProvider) {
    this.learningRepositoryProvider = learningRepositoryProvider;
  }

  @Override
  public LearnViewModel get() {
    return newInstance(learningRepositoryProvider.get());
  }

  public static LearnViewModel_Factory create(
      Provider<LearningRepository> learningRepositoryProvider) {
    return new LearnViewModel_Factory(learningRepositoryProvider);
  }

  public static LearnViewModel newInstance(LearningRepository learningRepository) {
    return new LearnViewModel(learningRepository);
  }
}
